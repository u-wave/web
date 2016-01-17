import assign from 'object-assign';
import except from 'except';
import findIndex from 'array-findindex';
import indexBy from 'index-by';
import mapObj from 'object.map';

import {
  LOAD_ALL_PLAYLISTS_COMPLETE,
  LOAD_PLAYLIST_START, LOAD_PLAYLIST_COMPLETE,
  SELECT_PLAYLIST,
  ACTIVATE_PLAYLIST_START, ACTIVATE_PLAYLIST_COMPLETE,
  CREATE_PLAYLIST_START, CREATE_PLAYLIST_COMPLETE,
  ADD_MEDIA_START, ADD_MEDIA_COMPLETE,
  REMOVE_MEDIA_START, REMOVE_MEDIA_COMPLETE,
  MOVE_MEDIA_START, MOVE_MEDIA_COMPLETE,
  UPDATE_MEDIA_START, UPDATE_MEDIA_COMPLETE
} from '../constants/actionTypes/playlists';
import { SEARCH_START } from '../constants/actionTypes/search';

const initialState = {
  playlists: {},
  activePlaylistID: null,
  activeMedia: [],
  selectedPlaylistID: null,
  selectedMedia: []
};

function setLoading(playlists, id, loading = true) {
  const playlist = playlists[id];
  if (playlist && playlist.loading !== loading) {
    return {
      ...playlists,
      [id]: { ...playlist, loading }
    };
  }
  return playlists;
}

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

// Applies a function to the media list belonging to `playlistID` if it is found
// locally, i.e. in either the active or the selected playlist.
function applyMediaChangeTo(state, playlistID, modify) {
  if (playlistID === state.selectedPlaylistID) {
    return {
      ...state,
      selectedMedia: modify(state.selectedMedia)
    };
  } else if (playlistID === state.activePlaylistID) {
    return {
      ...state,
      activeMedia: modify(state.activeMedia)
    };
  }
  return state;
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
  switch (type) {
  case LOAD_ALL_PLAYLISTS_COMPLETE:
    return error
      ? state
      : {
        ...state,
        playlists: indexBy(payload.playlists, '_id')
      };
  case ACTIVATE_PLAYLIST_START:
    return {
      ...state,
      // TODO use a different property here so we can show a loading icon on
      // the "Active" button only, instead of on top of the entire playlist
      playlists: setLoading(state.playlists, payload.playlistID)
    };
  case ACTIVATE_PLAYLIST_COMPLETE:
    return {
      ...state,
      // set `active` property on all playlists
      playlists: mapObj(state.playlists, playlist => ({
        ...playlist,
        loading: playlist._id === payload.playlistID ? false : playlist.loading,
        active: playlist._id === payload.playlistID
      })),
      activePlaylistID: payload.playlistID,
      // reuse the selected media collection if we are setting the selected
      // playlist to active (i.e. most of the time)
      activeMedia: payload.playlistID === state.selectedPlaylistID
        ? state.selectedMedia
        : []
    };
  case SELECT_PLAYLIST:
    return {
      ...state,
      // set `selected` property on playlists
      playlists: mapObj(state.playlists, playlist => ({
        ...playlist,
        selected: playlist._id === payload.playlistID
      })),
      selectedPlaylistID: payload.playlistID,
      // reuse the active media collection if we are selecting the active
      // playlist
      selectedMedia: payload.playlistID === state.activePlaylistID
        ? state.activeMedia
        : []
    };
  case SEARCH_START:
    // We deselect playlists when doing a search, so the UI can switch to the
    // search results view instead.
    return {
      ...state,
      playlists: deselectAll(state.playlists),
      selectedPlaylistID: null,
      selectedMedia: []
    };

  case LOAD_PLAYLIST_START:
    if (meta.page !== 0) {
      return state;
    }
    return {
      ...state,
      playlists: setLoading(state.playlists, payload.playlistID)
    };
  case LOAD_PLAYLIST_COMPLETE:
    return {
      ...state,
      playlists: setLoading(state.playlists, payload.playlistID, false),
      selectedMedia: state.selectedPlaylistID === payload.playlistID
        ? mergePlaylistPage(
            state.playlists[state.selectedPlaylistID],
            state.selectedMedia,
            payload.media,
            meta
          )
        : state.selectedMedia,
      activeMedia: state.activePlaylistID === payload.playlistID
        ? mergePlaylistPage(
            state.playlists[state.activePlaylistID],
            state.activeMedia,
            payload.media,
            meta
          )
        : state.activeMedia
    };

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
      selectedPlaylistID: meta.tempId,
      selectedMedia: []
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
      selectedPlaylistID: payload.playlist._id,
      selectedMedia: []
    };

  case ADD_MEDIA_START:
    return {
      ...state,
      playlists: setLoading(state.playlists, payload.playlistID)
    };
  case ADD_MEDIA_COMPLETE:
    if (error) {
      return state;
    }
    const updatedPlaylist = state.playlists[payload.playlistID];
    if (updatedPlaylist) {
      return {
        ...state,
        playlists: {
          ...state.playlists,
          [updatedPlaylist._id]: {
            ...updatedPlaylist,
            loading: false,
            size: payload.newSize
          }
        },
        // append new media to relevant media collection if necessary
        selectedMedia: state.selectedPlaylistID === updatedPlaylist._id
          ? [ ...state.selectedMedia, ...payload.appendedMedia ]
          : state.selectedMedia,
        activeMedia: state.activePlaylistID === updatedPlaylist._id
          ? [ ...state.activeMedia, ...payload.appendedMedia ]
          : state.activeMedia
      };
    }
    return state;

  case UPDATE_MEDIA_START:
    return applyMediaChangeTo(state, payload.playlistID, playlist =>
      playlist.map(media =>
        media && media._id === payload.mediaID
          ? { ...media, loading: true }
          : media
      )
    );
  case UPDATE_MEDIA_COMPLETE:
    return applyMediaChangeTo(state, payload.playlistID, playlist =>
      playlist.map(media =>
        media && media._id === payload.mediaID
          ? { ...media, ...payload.media, loading: false }
          : media
      )
    );

  case MOVE_MEDIA_START:
    const isMovingMedia = indexBy(payload.medias, '_id');
    return applyMediaChangeTo(state, payload.playlistID, playlist =>
      playlist.map(media => media && ({
        ...media,
        loading: isMovingMedia[media._id] || media.loading
      }))
    );
  case MOVE_MEDIA_COMPLETE:
    if (error) {
      return state;
    }
    return applyMediaChangeTo(state, payload.playlistID, playlist =>
      processMove(playlist, payload.medias, payload.afterID)
    );

  case REMOVE_MEDIA_START:
    const isRemovingMedia = indexBy(payload.medias, '_id');
    return applyMediaChangeTo(state, payload.playlistID, playlist =>
      playlist.map(media => media && ({
        ...media,
        loading: isRemovingMedia[media._id] || media.loading
      }))
    );
  case REMOVE_MEDIA_COMPLETE:
    if (error) {
      return state;
    }
    const isRemovedMedia = indexBy(payload.removedMedia, '_id');
    const removedFromPlaylist = state.playlists[payload.playlistID];
    return assign(
      applyMediaChangeTo(state, payload.playlistID, playlist =>
        playlist.filter(media => media === null || !isRemovedMedia[media._id])
      ),
      { playlists: {
        ...state.playlists,
        [removedFromPlaylist._id]: {
          ...removedFromPlaylist,
          size: payload.newSize
        }
      } }
    );
  default:
    return state;
  }
}
