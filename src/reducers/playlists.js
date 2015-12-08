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

export default function reduce(state = initialState, action = {}) {
  const { type, payload, error } = action;
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
        deselectAll(except(state.playlists, meta.tempId)),
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
    if (payload.playlistID === state.selectedPlaylistID) {
      return {
        ...state,
        selectedMedia: state.selectedMedia.map(media => ({
          ...media,
          loading: isMovingMedia[media._id] || media.loading
        }))
      };
    } else if (payload.playlistID === state.activePlaylistID) {
      return {
        ...state,
        activeMedia: state.activeMedia.map(media => ({
          ...media,
          loading: isMovingMedia[media._id] || media.loading
        }))
      };
    }
    return state;
  case 'movedMediaInPlaylist':
    if (error) {
      return state;
    }
    if (state.selectedPlaylistID === payload.playlistID) {
      return {
        ...state,
        selectedMedia: processMove(state.selectedMedia, payload.medias, payload.afterID)
      };
    } else if (state.activePlaylistID === payload.playlistID) {
      return {
        ...state,
        activeMedia: processMove(state.activeMedia, payload.medias, payload.afterID)
      };
    }
    return state;
  default:
    return state;
  }
}
