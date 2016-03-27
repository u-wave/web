import assign from 'object-assign';
import except from 'except';
import findIndex from 'array-findindex';
import indexBy from 'index-by';
import mapObj from 'object.map';

import {
  LOAD_ALL_PLAYLISTS_COMPLETE,
  LOAD_PLAYLIST_START, LOAD_PLAYLIST_COMPLETE,
  PLAYLIST_CYCLED,
  SELECT_PLAYLIST,
  ACTIVATE_PLAYLIST_START, ACTIVATE_PLAYLIST_COMPLETE,
  CREATE_PLAYLIST_START, CREATE_PLAYLIST_COMPLETE,
  RENAME_PLAYLIST_START, RENAME_PLAYLIST_COMPLETE,
  DELETE_PLAYLIST_START, DELETE_PLAYLIST_COMPLETE,
  ADD_MEDIA_START, ADD_MEDIA_COMPLETE,
  REMOVE_MEDIA_START, REMOVE_MEDIA_COMPLETE,
  MOVE_MEDIA_START, MOVE_MEDIA_COMPLETE,
  UPDATE_MEDIA_START, UPDATE_MEDIA_COMPLETE
} from '../constants/actionTypes/playlists';
import { SEARCH_START } from '../constants/actionTypes/search';

const initialState = {
  playlists: {},
  playlistItems: {},
  activePlaylistID: null,
  selectedPlaylistID: null
};

function deselectAll(playlists) {
  return mapObj(playlists, playlist => {
    return playlist.selected
      ? { ...playlist, selected: false }
      : playlist;
  });
}

// Moves a list of media items to a given position in the playlist.
function processMove(list, movedMedia, afterID) {
  // Take all moved media items out of the playlist…
  const wasMoved = indexBy(movedMedia, '_id');
  const newPlaylist = list.filter(media => media === null || !wasMoved[media._id]);
  // …and add them back in at the correct place.
  const insertIdx = afterID === -1
    ? 0
    : findIndex(newPlaylist, media => media._id === afterID) + 1;
  newPlaylist.splice(insertIdx, 0, ...movedMedia);
  return newPlaylist;
}

function updatePlaylist(state, playlistID, modify) {
  const playlist = state.playlists[playlistID];
  if (playlist) {
    return {
      ...state,
      playlists: {
        ...state.playlists,
        [playlistID]: modify(playlist)
      }
    };
  }
  return state;
}

// Applies a function to the media list belonging to `playlistID` if it is found
// locally, i.e. in either the active or the selected playlist.
function updatePlaylistItems(state, playlistID, modify) {
  const playlist = state.playlists[playlistID];
  const media = state.playlistItems[playlistID];
  if (playlist) {
    return {
      ...state,
      playlistItems: {
        ...state.playlistItems,
        [playlistID]: modify(media || [], playlist)
      }
    };
  }
  return state;
}

function updatePlaylistAndItems(state, playlistID, modifyPlaylist, modifyItems) {
  const newState = updatePlaylist(state, playlistID, modifyPlaylist);
  return updatePlaylistItems(newState, playlistID, modifyItems);
}

function setPlaylistLoading(state, id, loading = true) {
  return updatePlaylist(state, id, playlist => ({
    ...playlist,
    loading
  }));
}

function fill(array, value) {
  for (let i = 0, l = array.length; i < l; i++) {
    array[i] = value;
  }
  return array;
}

function mergePlaylistPage(playlist, oldMedia, newMedia, { page, pageSize }) {
  const media = fill(Array(playlist.size), null);
  oldMedia.forEach((item, i) => media[i] = item);
  newMedia.forEach((item, i) =>
    media[i + page * pageSize] = item
  );
  return media;
}

export default function reduce(state = initialState, action = {}) {
  const { type, payload, meta, error } = action;

  if (error) {
    return state;
  }

  switch (type) {
  case LOAD_ALL_PLAYLISTS_COMPLETE:
    return {
      ...state,
      playlists: indexBy(payload.playlists, '_id')
    };
  case ACTIVATE_PLAYLIST_START:
    // TODO use a different property here so we can show a loading icon on
    // the "Active" button only, instead of on top of the entire playlist
    return setPlaylistLoading(state, payload.playlistID);
  case ACTIVATE_PLAYLIST_COMPLETE:
    return {
      ...state,
      // set `active` property on all playlists
      playlists: mapObj(state.playlists, playlist => ({
        ...playlist,
        loading: playlist._id === payload.playlistID ? false : playlist.loading,
        active: playlist._id === payload.playlistID
      })),
      activePlaylistID: payload.playlistID
    };
  case SELECT_PLAYLIST:
    return {
      ...state,
      // set `selected` property on playlists
      playlists: mapObj(state.playlists, playlist => ({
        ...playlist,
        selected: playlist._id === payload.playlistID
      })),
      selectedPlaylistID: payload.playlistID
    };
  case SEARCH_START:
    // We deselect playlists when doing a search, so the UI can switch to the
    // search results view instead.
    return {
      ...state,
      playlists: deselectAll(state.playlists),
      selectedPlaylistID: null
    };

  case LOAD_PLAYLIST_START:
    if (meta.page !== 0) {
      return state;
    }
    return setPlaylistLoading(state, payload.playlistID);
  case LOAD_PLAYLIST_COMPLETE:
    return updatePlaylistAndItems(
      state,
      payload.playlistID,
      playlist => ({ ...playlist, loading: false }),
      (items, playlist) => mergePlaylistPage(playlist, items, payload.media, meta)
    );

  case PLAYLIST_CYCLED:
    return updatePlaylistItems(state, payload.playlistID, (items, playlist) => {
      const newItems = items.slice(1);
      newItems[playlist.size - 1] = items[0];
      return newItems;
    });

  // here be dragons
  // TODO find a simpler way to store this stuff, that doesn't involve keeping
  // millions of properties (six properties to be precise) in sync
  // Playlists that are being created have a temporary ID that is used until the
  // real ID comes back from the server.
  case CREATE_PLAYLIST_START:
    const newPlaylist = {
      _id: meta.tempId,
      name: payload.name,
      description: payload.description,
      shared: payload.shared,
      selected: true,
      creating: true
    };
    return {
      ...state,
      playlists: assign(
        deselectAll(state.playlists),
        { [meta.tempId]: newPlaylist }
      ),
      selectedPlaylistID: meta.tempId
    };
  case CREATE_PLAYLIST_COMPLETE:
    return {
      ...state,
      playlists: assign(
        deselectAll(except(state.playlists, `${meta.tempId}`)),
        { [payload.playlist._id]: {
          ...payload.playlist,
          selected: true
        } }
      ),
      selectedPlaylistID: payload.playlist._id
    };

  case RENAME_PLAYLIST_START:
    return setPlaylistLoading(state, payload.playlistID);
  case RENAME_PLAYLIST_COMPLETE:
    const renamedPlaylist = state.playlists[payload.playlistID];
    if (renamedPlaylist) {
      return updatePlaylist(state, payload.playlistID, playlist => ({
        ...playlist,
        name: payload.name,
        loading: false
      }));
    }
    return state;
  case DELETE_PLAYLIST_START:
    return setPlaylistLoading(state, payload.playlistID);
  case DELETE_PLAYLIST_COMPLETE:
    return {
      ...state,
      // When deleting the selected playlist, select the active playlist instead.
      selectedPlaylistID: state.selectedPlaylistID === payload.playlistID
        ? state.activePlaylistID
        : state.selectedPlaylistID,
      playlists: except(state.playlists, payload.playlistID)
    };

  case ADD_MEDIA_START:
    return setPlaylistLoading(state, payload.playlistID);
  case ADD_MEDIA_COMPLETE:
    return updatePlaylistAndItems(
      state,
      payload.playlistID,
      playlist => ({
        ...playlist,
        loading: false,
        size: payload.newSize
      }),
      items => [ ...items, ...payload.appendedMedia ]
    );

  case UPDATE_MEDIA_START:
    return updatePlaylistItems(state, payload.playlistID, items =>
      items.map(media =>
        media && media._id === payload.mediaID
          ? { ...media, loading: true }
          : media
      )
    );
  case UPDATE_MEDIA_COMPLETE:
    return updatePlaylistItems(state, payload.playlistID, items =>
      items.map(media =>
        media && media._id === payload.mediaID
          ? { ...media, ...payload.media, loading: false }
          : media
      )
    );

  case MOVE_MEDIA_START:
    const isMovingMedia = indexBy(payload.medias, '_id');
    return updatePlaylistItems(state, payload.playlistID, items =>
      items.map(media => media && ({
        ...media,
        loading: isMovingMedia[media._id] || media.loading
      }))
    );
  case MOVE_MEDIA_COMPLETE:
    return updatePlaylistItems(state, payload.playlistID, items =>
      processMove(items, payload.medias, payload.afterID)
    );

  case REMOVE_MEDIA_START:
    const isRemovingMedia = indexBy(payload.medias, '_id');
    return updatePlaylistItems(state, payload.playlistID, items =>
      items.map(media => media && ({
        ...media,
        loading: isRemovingMedia[media._id] || media.loading
      }))
    );
  case REMOVE_MEDIA_COMPLETE:
    const isRemovedMedia = indexBy(payload.removedMedia, '_id');
    return updatePlaylistAndItems(
      state,
      payload.playlistID,
      playlist => ({ ...playlist, size: payload.newSize }),
      items => items.filter(media => media === null || !isRemovedMedia[media._id])
    );
  default:
    return state;
  }
}
