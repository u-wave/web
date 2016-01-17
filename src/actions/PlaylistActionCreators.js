import values from 'object-values';

import {
  LOAD_ALL_PLAYLISTS_START, LOAD_ALL_PLAYLISTS_COMPLETE,
  LOAD_PLAYLIST_START, LOAD_PLAYLIST_COMPLETE,
  SELECT_PLAYLIST,
  ACTIVATE_PLAYLIST_START, ACTIVATE_PLAYLIST_COMPLETE,
  CREATE_PLAYLIST_START, CREATE_PLAYLIST_COMPLETE,
  OPEN_ADD_MEDIA_MENU, CLOSE_ADD_MEDIA_MENU,
  ADD_MEDIA_START, ADD_MEDIA_COMPLETE,
  REMOVE_MEDIA_START, REMOVE_MEDIA_COMPLETE,
  MOVE_MEDIA_START, MOVE_MEDIA_COMPLETE,
  UPDATE_MEDIA_START, UPDATE_MEDIA_COMPLETE
} from '../constants/actionTypes/playlists';
import { openEditMediaDialog } from './DialogActionCreators';
import { del, get, post, put } from '../utils/Request';

export function setPlaylists(playlists) {
  return {
    type: LOAD_ALL_PLAYLISTS_COMPLETE,
    payload: { playlists }
  };
}

export function flattenPlaylistItem(item) {
  return {
    ...item.media,
    ...item
  };
}

const inFlightPlaylists = {};
export function loadPlaylist(playlistID, page = 0) {
  return (dispatch, getState) => {
    const key = `${playlistID}:${page}`;

    // Prevent duplicate loading.
    if (inFlightPlaylists[key]) return;

    const jwt = getState().auth.jwt;

    dispatch({
      type: LOAD_PLAYLIST_START,
      payload: { playlistID },
      meta: { page }
    });

    inFlightPlaylists[key] = true;
    get(jwt, `/v1/playlists/${playlistID}/media`, { page, limit: 50 })
      .then(res => res.json())
      .then(res => {
        inFlightPlaylists[key] = false;
        dispatch({
          type: LOAD_PLAYLIST_COMPLETE,
          payload: {
            playlistID,
            media: res.result.map(flattenPlaylistItem)
          },
          meta: {
            page: res.page,
            pageSize: res.size
          }
        });
      })
      .catch(e => {
        inFlightPlaylists[key] = false;
        dispatch({
          type: LOAD_PLAYLIST_COMPLETE,
          error: true,
          payload: e,
          meta: { page }
        });
      });
  };
}

export function selectPlaylist(playlistID) {
  return dispatch => {
    dispatch({
      type: SELECT_PLAYLIST,
      payload: { playlistID }
    });

    if (playlistID) {
      dispatch(loadPlaylist(playlistID));
    }
  };
}

export function activatePlaylist(playlistID) {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;

    dispatch({
      type: ACTIVATE_PLAYLIST_START,
      payload: { playlistID }
    });
    put(jwt, `/v1/playlists/${playlistID}/activate`)
      .then(() => {
        dispatch({
          type: ACTIVATE_PLAYLIST_COMPLETE,
          payload: { playlistID }
        });
      })
      .catch(error => {
        dispatch({
          type: ACTIVATE_PLAYLIST_COMPLETE,
          error: true,
          payload: error,
          meta: { playlistID }
        });
      });
  };
}

export function loadPlaylists() {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;

    dispatch({ type: LOAD_ALL_PLAYLISTS_START });
    get(jwt, '/v1/playlists')
      .then(res => res.json())
      .then(playlists => {
        dispatch({
          type: LOAD_ALL_PLAYLISTS_COMPLETE,
          payload: { playlists }
        });
      })
      .catch(error => {
        dispatch({
          type: LOAD_ALL_PLAYLISTS_COMPLETE,
          error: true,
          payload: error
        });
      });
  };
}

function doCreatePlaylist(name) {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;

    const tempId = -Date.now();
    const description = '';
    const shared = false;
    dispatch({
      type: CREATE_PLAYLIST_START,
      payload: { name, description, shared },
      meta: { tempId }
    });

    post(jwt, '/v1/playlists', { name, description, shared })
      .then(res => res.json())
      .then(playlist => {
        dispatch({
          type: CREATE_PLAYLIST_COMPLETE,
          payload: { playlist },
          meta: { tempId }
        });
      })
      .catch(error => {
        dispatch({
          type: CREATE_PLAYLIST_COMPLETE,
          error: true,
          payload: error,
          meta: { tempId }
        });
      });
  };
}

export function createPlaylist() {
  return dispatch => {
    const name = prompt('Playlist name?');
    if (name) {
      dispatch(doCreatePlaylist(name));
    }
  };
}

export function addMediaMenu(items, position) {
  return (dispatch, getState) => {
    const playlists = values(getState().playlists.playlists);
    dispatch({
      type: OPEN_ADD_MEDIA_MENU,
      payload: {
        media: items
      },
      meta: {
        playlists,
        position,
        type: 'add'
      }
    });
  };
}

export function closeAddMediaMenu() {
  return { type: CLOSE_ADD_MEDIA_MENU };
}

export function addMedia(playlist, items, afterID = null) {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;

    dispatch({
      type: ADD_MEDIA_START,
      payload: {
        playlistID: playlist._id,
        media: items,
        afterID
      }
    });

    post(jwt, `/v1/playlists/${playlist._id}/media`, { items, after: afterID })
      .then(res => res.json())
      .then(({ added, playlistSize }) => {
        dispatch({
          type: ADD_MEDIA_COMPLETE,
          payload: {
            playlistID: playlist._id,
            newSize: playlistSize,
            afterID: afterID,
            appendedMedia: added.map(flattenPlaylistItem)
          }
        });
      })
      .catch(error => {
        dispatch({
          type: ADD_MEDIA_COMPLETE,
          error: true,
          payload: error
        });
      });
  };
}

export function editMedia(playlistID, media) {
  return openEditMediaDialog(playlistID, media);
}

export function updateMedia(playlistID, mediaID, props) {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;
    dispatch({
      type: UPDATE_MEDIA_START,
      payload: { playlistID, mediaID, props }
    });
    put(jwt, `/v1/playlists/${playlistID}/media/${mediaID}`, props)
      .then(res => res.json())
      .then(media => dispatch({
        type: UPDATE_MEDIA_COMPLETE,
        payload: { playlistID, mediaID, media }
      }))
      .catch(err => dispatch({
        type: UPDATE_MEDIA_COMPLETE,
        payload: err,
        error: true,
        meta: { playlistID, mediaID, props }
      }));
  };
}

export function removeMedia(playlistID, medias) {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;
    dispatch({
      type: REMOVE_MEDIA_START,
      payload: { playlistID, medias }
    });
    const items = medias.map(media => media._id);
    del(jwt, `/v1/playlists/${playlistID}/media`, { items })
      .then(res => res.json())
      .then(({ removed, playlistSize }) => {
        dispatch({
          type: REMOVE_MEDIA_COMPLETE,
          payload: {
            playlistID,
            newSize: playlistSize,
            removedMedia: removed.map(flattenPlaylistItem)
          }
        });
      })
      .catch(error => {
        dispatch({
          type: REMOVE_MEDIA_COMPLETE,
          error: true,
          payload: error
        });
      });
  };
}

export function moveMedia(playlistID, medias, afterID) {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;

    const payload = { playlistID, medias, afterID };
    dispatch({
      type: MOVE_MEDIA_START,
      payload
    });
    const items = medias.map(media => media._id);
    put(jwt, `/v1/playlists/${playlistID}/move`, { items, after: afterID })
      .then(res => res.json())
      .then(() => {
        dispatch({
          type: MOVE_MEDIA_COMPLETE,
          payload
        });
      })
      .catch(error => {
        dispatch({
          type: MOVE_MEDIA_COMPLETE,
          error: true,
          payload: error,
          meta: payload
        });
      });
  };
}
