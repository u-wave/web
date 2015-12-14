import assign from 'object-assign';
import except from 'except';
import findIndex from 'array-findindex';
import indexBy from 'index-by';
import mapObj from 'object.map';

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

function processMove(list, movedMedia, afterID) {
  const movedMap = indexBy(movedMedia, '_id');
  const updated = list.filter(media => !movedMap[media._id]);
  const insertIdx = afterID === -1
    ? 0
    : findIndex(updated, media => media._id === afterID) + 1;
  updated.splice(insertIdx, 0, ...movedMedia);
  return updated;
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

export default function reduce(state = initialState, action = {}) {
  const { type, payload, meta, error } = action;
  switch (type) {
  case 'loadedPlaylists':
    return error
      ? state
      : {
        ...state,
        playlists: indexBy(payload.playlists, '_id')
      };
  case 'activatePlaylist':
    return {
      ...state,
      // TODO use a different property here so we can show a loading icon on
      // the "Active" button only, instead of on top of the entire playlist
      playlists: setLoading(state.playlists, payload.playlistID)
    };
  case 'activatedPlaylist':
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
  case 'selectPlaylist':
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
  case 'searchStart':
    return {
      ...state,
      // deselect playlists
      playlists: deselectAll(state.playlists),
      selectedPlaylistID: null,
      selectedMedia: []
    };

  case 'loadingPlaylist':
    return {
      ...state,
      playlists: setLoading(state.playlists, payload.playlistID)
    };
  case 'loadedPlaylist':
    return {
      ...state,
      playlists: setLoading(state.playlists, payload.playlistID, false),
      selectedMedia: state.selectedPlaylistID === payload.playlistID
        ? payload.media
        : state.selectedMedia,
      activeMedia: state.activePlaylistID === payload.playlistID
        ? payload.media
        : state.activeMedia
    };

  // here be dragons
  // TODO find a simpler way to store this stuff, that doesn't involve keeping
  // millions of properties (six properties to be precise) in sync
  case 'creatingPlaylist':
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
  case 'createdPlaylist':
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

  case 'addMediaToPlaylist':
    return {
      ...state,
      playlists: setLoading(state.playlists, payload.playlistID)
    };
  case 'addedMediaToPlaylist':
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

  case 'moveMediaInPlaylist':
    const isMovingMedia = indexBy(payload.medias, '_id');
    return applyMediaChangeTo(state, payload.playlistID, playlist =>
      playlist.map(media => ({
        ...media,
        loading: isMovingMedia[media._id] || media.loading
      }))
    );
  case 'movedMediaInPlaylist':
    if (error) {
      return state;
    }
    return applyMediaChangeTo(state, payload.playlistID, playlist =>
      processMove(playlist, payload.medias, payload.afterID)
    );

  case 'removeMediaFromPlaylist':
    const isRemovingMedia = indexBy(payload.medias, '_id');
    return applyMediaChangeTo(state, payload.playlistID, playlist =>
      playlist.map(media => ({
        ...media,
        loading: isRemovingMedia[media._id] || media.loading
      }))
    );
  case 'removedMediaFromPlaylist':
    if (error) {
      return state;
    }
    const isRemovedMedia = indexBy(payload.removedMedia, '_id');
    const removedFromPlaylist = state.playlists[payload.playlistID];
    return assign(
      applyMediaChangeTo(state, payload.playlistID, playlist =>
        playlist.filter(media => !isRemovedMedia[media._id])
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
