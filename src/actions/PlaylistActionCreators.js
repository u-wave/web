import {
  LOAD_ALL_PLAYLISTS_START, LOAD_ALL_PLAYLISTS_COMPLETE,
  LOAD_PLAYLIST_START, LOAD_PLAYLIST_COMPLETE,
  SELECT_PLAYLIST,
  ACTIVATE_PLAYLIST_START, ACTIVATE_PLAYLIST_COMPLETE,
  CREATE_PLAYLIST_START, CREATE_PLAYLIST_COMPLETE,
  RENAME_PLAYLIST_START, RENAME_PLAYLIST_COMPLETE,
  DELETE_PLAYLIST_START, DELETE_PLAYLIST_COMPLETE,
  OPEN_ADD_MEDIA_MENU, CLOSE_ADD_MEDIA_MENU,
  ADD_MEDIA_START, ADD_MEDIA_COMPLETE,
  REMOVE_MEDIA_START, REMOVE_MEDIA_COMPLETE,
  MOVE_MEDIA_START, MOVE_MEDIA_COMPLETE,
  UPDATE_MEDIA_START, UPDATE_MEDIA_COMPLETE
} from '../constants/actionTypes/playlists';
import { openEditMediaDialog } from './DialogActionCreators';
import { del, get, post, put } from '../utils/Request';
import { playlistsSelector } from '../selectors/playlistSelectors';
import { tokenSelector } from '../selectors/userSelectors';

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

    const jwt = tokenSelector(getState());

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

export function activatePlaylistStart(playlistID) {
  return {
    type: ACTIVATE_PLAYLIST_START,
    payload: { playlistID }
  };
}

export function activatePlaylistComplete(playlistID) {
  return {
    type: ACTIVATE_PLAYLIST_COMPLETE,
    payload: { playlistID }
  };
}

export function activatePlaylist(playlistID) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());

    dispatch(activatePlaylistStart(playlistID));
    put(jwt, `/v1/playlists/${playlistID}/activate`)
      .then(() => dispatch(activatePlaylistComplete(playlistID)))
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

export function loadPlaylistsStart() {
  return { type: LOAD_ALL_PLAYLISTS_START };
}

export function loadPlaylistsComplete(playlists) {
  return {
    type: LOAD_ALL_PLAYLISTS_COMPLETE,
    payload: { playlists }
  };
}

export function loadPlaylists() {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());

    dispatch(loadPlaylistsStart());
    get(jwt, '/v1/playlists')
      .then(res => res.json())
      .then(playlists => dispatch(loadPlaylistsComplete(playlists)))
      .catch(error => {
        dispatch({
          type: LOAD_ALL_PLAYLISTS_COMPLETE,
          error: true,
          payload: error
        });
      });
  };
}

export function createPlaylistStart(props, tempId) {
  return {
    type: CREATE_PLAYLIST_START,
    payload: props,
    meta: { tempId }
  };
}

export function createPlaylistComplete(playlist, tempId) {
  return {
    type: CREATE_PLAYLIST_COMPLETE,
    payload: { playlist },
    meta: { tempId }
  };
}

export function createPlaylist(name) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());

    const tempId = -Date.now();
    const description = '';
    const shared = false;
    dispatch(createPlaylistStart({ name, description, shared }, tempId));

    post(jwt, '/v1/playlists', { name, description, shared })
      .then(res => res.json())
      .then(playlist => dispatch(createPlaylistComplete(playlist, tempId)))
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

export function askCreatePlaylist() {
  return dispatch => {
    const name = prompt('Playlist name?');
    if (name) {
      dispatch(createPlaylist(name));
    }
  };
}

export function renamePlaylist(playlistID, name) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    dispatch({
      type: RENAME_PLAYLIST_START,
      payload: { playlistID, name }
    });
    put(jwt, `/v1/playlists/${playlistID}/rename`, { name })
      .then(res => res.json())
      .then(playlist => dispatch({
        type: RENAME_PLAYLIST_COMPLETE,
        payload: { playlistID, name: playlist.name }
      }))
      .catch(error => dispatch({
        type: RENAME_PLAYLIST_COMPLETE,
        error: true,
        payload: error,
        meta: { playlistID, name }
      }));
  };
}

export function askRenamePlaylist(playlistID) {
  return dispatch => {
    const name = prompt('Name?');
    if (name) {
      dispatch(renamePlaylist(playlistID, name));
    }
  };
}

export function deletePlaylist(playlistID) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    dispatch({
      type: DELETE_PLAYLIST_START,
      payload: { playlistID }
    });

    del(jwt, `/v1/playlists/${playlistID}`)
      .then(res => res.json())
      .then(() => dispatch({
        type: DELETE_PLAYLIST_COMPLETE,
        payload: { playlistID }
      }))
      .catch(error => dispatch({
        type: DELETE_PLAYLIST_COMPLETE,
        error: true,
        payload: error,
        meta: { playlistID }
      }));
  };
}

export function askDeletePlaylist(playlistID) {
  return dispatch => {
    if (confirm('Sure?')) {
      dispatch(deletePlaylist(playlistID));
    }
  };
}

export function addMediaMenu(items, position) {
  return (dispatch, getState) => {
    const playlists = playlistsSelector(getState());
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

export function addMediaStart(playlistID, media, afterID) {
  return {
    type: ADD_MEDIA_START,
    payload: { playlistID, media, afterID }
  };
}

export function addMediaComplete(playlistID, newSize, insert) {
  return {
    type: ADD_MEDIA_COMPLETE,
    payload: {
      playlistID,
      newSize,
      afterID: insert.afterID,
      appendedMedia: insert.media
    }
  };
}

export function addMedia(playlist, items, afterID = null) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());

    dispatch(addMediaStart(playlist._id, items, afterID));

    post(jwt, `/v1/playlists/${playlist._id}/media`, { items, after: afterID })
      .then(res => res.json())
      .then(({ added, playlistSize }) =>
        dispatch(addMediaComplete(
          playlist._id,
          playlistSize,
          { afterID, media: added.map(flattenPlaylistItem) }
        ))
      )
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

export function updateMediaStart(playlistID, mediaID, props) {
  return {
    type: UPDATE_MEDIA_START,
    payload: { playlistID, mediaID, props }
  };
}

export function updateMediaComplete(playlistID, mediaID, media) {
  return {
    type: UPDATE_MEDIA_COMPLETE,
    payload: { playlistID, mediaID, media }
  };
}

export function updateMedia(playlistID, mediaID, props) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    dispatch(updateMediaStart(playlistID, mediaID, props));
    put(jwt, `/v1/playlists/${playlistID}/media/${mediaID}`, props)
      .then(res => res.json())
      .then(media => dispatch(updateMediaComplete(playlistID, mediaID, media)))
      .catch(err => dispatch({
        type: UPDATE_MEDIA_COMPLETE,
        payload: err,
        error: true,
        meta: { playlistID, mediaID, props }
      }));
  };
}

export function removeMediaStart(playlistID, items) {
  return {
    type: REMOVE_MEDIA_START,
    payload: { playlistID, medias: items }
  };
}

export function removeMediaComplete(playlistID, newSize, removedMedia) {
  return {
    type: REMOVE_MEDIA_COMPLETE,
    payload: {
      playlistID,
      newSize,
      removedMedia
    }
  };
}

export function removeMedia(playlistID, items) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    dispatch(removeMediaStart(playlistID, items));
    const itemIDs = items.map(media => media._id);
    del(jwt, `/v1/playlists/${playlistID}/media`, { items: itemIDs })
      .then(res => res.json())
      .then(({ removed, playlistSize }) =>
        dispatch(removeMediaComplete(
          playlistID,
          playlistSize,
          removed.map(flattenPlaylistItem)
        ))
      )
      .catch(error => {
        dispatch({
          type: REMOVE_MEDIA_COMPLETE,
          error: true,
          payload: error
        });
      });
  };
}

export function moveMediaStart(playlistID, items, afterID) {
  return {
    type: MOVE_MEDIA_START,
    payload: { playlistID, afterID, medias: items }
  };
}

export function moveMediaComplete(playlistID, items, afterID) {
  return {
    type: MOVE_MEDIA_COMPLETE,
    payload: { playlistID, afterID, medias: items }
  };
}

export function moveMedia(playlistID, medias, afterID) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());

    dispatch(moveMediaStart(playlistID, medias, afterID));
    const items = medias.map(media => media._id);
    put(jwt, `/v1/playlists/${playlistID}/move`, { items, after: afterID })
      .then(res => res.json())
      .then(() => dispatch(moveMediaComplete(playlistID, medias, afterID)))
      .catch(error => {
        dispatch({
          type: MOVE_MEDIA_COMPLETE,
          error: true,
          payload: error,
          meta: { playlistID, medias, afterID }
        });
      });
  };
}
