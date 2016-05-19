import {
  LOAD_ALL_PLAYLISTS_START, LOAD_ALL_PLAYLISTS_COMPLETE,
  LOAD_PLAYLIST_START, LOAD_PLAYLIST_COMPLETE,
  PLAYLIST_CYCLED,
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
import { del, get, post, put } from './RequestActionCreators';

import {
  playlistsSelector, playlistItemsSelector,
  activePlaylistIDSelector, selectedPlaylistIDSelector,
  activePlaylistSelector, selectedPlaylistSelector
} from '../selectors/playlistSelectors';

const MEDIA_PAGE_SIZE = 50;

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

export function loadPlaylistStart(playlistID, page) {
  return {
    type: LOAD_PLAYLIST_START,
    payload: { playlistID },
    meta: { page }
  };
}

export function loadPlaylistComplete(playlistID, media, pagination) {
  return {
    type: LOAD_PLAYLIST_COMPLETE,
    payload: { playlistID, media },
    meta: pagination
  };
}

export function loadPlaylist(playlistID, page = 0) {
  return get(`/playlists/${playlistID}/media`, {
    qs: { page, limit: MEDIA_PAGE_SIZE },
    onStart: () => loadPlaylistStart(playlistID, page),
    onComplete: res => loadPlaylistComplete(
      playlistID,
      res.data.map(flattenPlaylistItem),
      {
        page: res.meta.offset / res.meta.pageSize,
        pageSize: res.meta.pageSize,
        size: res.meta.total
      }
    ),
    onError: error => ({
      type: LOAD_PLAYLIST_COMPLETE,
      error: true,
      payload: error,
      meta: { page }
    })
  });
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

export function playlistCycled(playlistID) {
  return {
    type: PLAYLIST_CYCLED,
    payload: { playlistID }
  };
}

function shouldLoadAfterCycle(playlist) {
  const media = playlist.media;
  // If the playlist was fully loaded, we can cycle naively
  if (media.length === playlist.size && media.every(Boolean)) {
    return false;
  }
  // If the first page _after_ cycle is fully loaded, we also don't need to do
  // anything.
  if (media.length > MEDIA_PAGE_SIZE &&
      media.slice(1, 1 + MEDIA_PAGE_SIZE).every(Boolean)) {
    return false;
  }
  // Otherwise, there will be unloaded items on the first page after cycling,
  // so we want to eagerly load the page again.
  return true;
}

export function cyclePlaylist(playlistID) {
  return (dispatch, getState) => {
    const activePlaylist = activePlaylistSelector(getState());
    const selectedPlaylist = selectedPlaylistSelector(getState());

    let playlist;

    if (playlistID === activePlaylist._id) {
      playlist = activePlaylist;
    } else if (playlistID === selectedPlaylist._id) {
      playlist = selectedPlaylist;
    }

    dispatch(playlistCycled(playlistID));

    if (playlist && shouldLoadAfterCycle(playlist)) {
      dispatch(loadPlaylist(playlistID, 0));
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
  return put(`/playlists/${playlistID}/activate`, {}, {
    onStart: () => activatePlaylistStart(playlistID),
    onComplete: () => activatePlaylistComplete(playlistID),
    onError: error => ({
      type: ACTIVATE_PLAYLIST_COMPLETE,
      error: true,
      payload: error,
      meta: { playlistID }
    })
  });
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
  return get('/playlists', {
    onStart: loadPlaylistsStart,
    onComplete: loadPlaylistsComplete,
    onError: error => ({
      type: LOAD_ALL_PLAYLISTS_COMPLETE,
      error: true,
      payload: error
    })
  });
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
  const tempId = -Date.now();
  const description = '';
  const shared = false;

  function onComplete(playlist) {
    return (dispatch, getState) => {
      const isFirstPlaylist = !activePlaylistIDSelector(getState());
      dispatch(createPlaylistComplete(playlist, tempId));
      if (isFirstPlaylist) {
        dispatch(activatePlaylistComplete(playlist._id));
      }
    };
  }

  return post('/playlists', { name, description, shared }, {
    onStart: () => createPlaylistStart({ name, description, shared }, tempId),
    onComplete,
    onError: error => ({
      type: CREATE_PLAYLIST_COMPLETE,
      error: true,
      payload: error,
      meta: { tempId }
    })
  });
}

export function renamePlaylist(playlistID, name) {
  return put(`/playlists/${playlistID}/rename`, { name }, {
    onStart: () => ({
      type: RENAME_PLAYLIST_START,
      payload: { playlistID, name }
    }),
    onComplete: playlist => ({
      type: RENAME_PLAYLIST_COMPLETE,
      payload: { playlistID, name: playlist.name }
    }),
    onError: error => ({
      type: RENAME_PLAYLIST_COMPLETE,
      error: true,
      payload: error,
      meta: { playlistID, name }
    })
  });
}

/**
 * Select or activate a different playlist than the one given.
 * @return Promise
 */

export function deselectPlaylist(playlistID) {
  return (dispatch, getState) => {
    const selectedID = selectedPlaylistIDSelector(getState());
    const activeID = activePlaylistIDSelector(getState());
    if (playlistID === selectedID) {
      dispatch(selectPlaylist(activeID));
    }
  };
}

export function deletePlaylistStart(playlistID) {
  return {
    type: DELETE_PLAYLIST_START,
    payload: { playlistID }
  };
}

export function deletePlaylistComplete(playlistID) {
  return {
    type: DELETE_PLAYLIST_COMPLETE,
    payload: { playlistID }
  };
}

export function cannotDeleteActivePlaylist(playlistID) {
  return {
    type: DELETE_PLAYLIST_COMPLETE,
    error: true,
    payload: new Error(
      'The active playlist cannot be deleted. ' +
      'Activate a different playlist first, before deleting this one.'
    ),
    meta: { playlistID }
  };
}

export function deletePlaylist(playlistID) {
  return (dispatch, getState) => {
    const activeID = activePlaylistIDSelector(getState());

    if (playlistID === activeID) {
      dispatch(cannotDeleteActivePlaylist(playlistID));
      return null;
    }

    dispatch(deselectPlaylist(playlistID));

    return dispatch(del(`/playlists/${playlistID}`, {}, {
      onStart: () => deletePlaylistStart(playlistID),
      onComplete: () => deletePlaylistComplete(playlistID),
      onError: error => ({
        type: DELETE_PLAYLIST_COMPLETE,
        error: true,
        payload: error,
        meta: { playlistID }
      })
    }));
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

/**
 * Keep only the playlist item properties that are necessary to add an item to
 * a playlist. The rest ("thumbnail" etc) is left out for smaller payloads.
 */

function minimizePlaylistItem(item) {
  return {
    sourceType: item.sourceType,
    sourceID: item.sourceID,
    artist: item.artist,
    title: item.title,
    start: item.start,
    end: item.end
  };
}

export function addMedia(playlist, items, afterID = null) {
  const payload = {
    items: items.map(minimizePlaylistItem),
    after: afterID
  };

  return post(`/playlists/${playlist._id}/media`, payload, {
    onStart: () => addMediaStart(playlist._id, items, afterID),
    onComplete: ({ added, playlistSize }) => addMediaComplete(
      playlist._id,
      playlistSize,
      { afterID, media: added.map(flattenPlaylistItem) }
    ),
    onError: error => ({
      type: ADD_MEDIA_COMPLETE,
      error: true,
      payload: error
    })
  });
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
  return put(`/playlists/${playlistID}/media/${mediaID}`, props, {
    onStart: () => updateMediaStart(playlistID, mediaID, props),
    onComplete: media => updateMediaComplete(playlistID, mediaID, media),
    onError: error => ({
      type: UPDATE_MEDIA_COMPLETE,
      payload: error,
      error: true,
      meta: { playlistID, mediaID, props }
    })
  });
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
  const itemIDs = items.map(media => media._id);
  return del(`/playlists/${playlistID}/media`, { items: itemIDs }, {
    onStart: () => removeMediaStart(playlistID, items),
    onComplete: ({ playlistSize }) => removeMediaComplete(
      playlistID,
      playlistSize,
      items
    ),
    onError: error => ({
      type: REMOVE_MEDIA_COMPLETE,
      error: true,
      payload: error
    })
  });
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

function resolveMoveOptions(playlist = [], opts = {}) {
  if (opts.after) {
    return opts.after;
  }
  if (opts.before) {
    for (let i = 0, l = playlist.length; i < l; i++) {
      if (playlist[i] && playlist[i]._id === opts.before) {
        if (i === 0) {
          return -1;
        }
        return playlist[i - 1]._id;
      }
    }
  }
  if (opts.at === 'start') {
    return -1;
  }
  return null;
}

export function moveMedia(playlistID, medias, opts) {
  return (dispatch, getState) => {
    const playlistItems = playlistItemsSelector(getState())[playlistID];
    const afterID = resolveMoveOptions(playlistItems, opts);

    const items = medias.map(media => media._id);

    return dispatch(put(`/playlists/${playlistID}/move`, { items, after: afterID }, {
      onStart: () => moveMediaStart(playlistID, medias, afterID),
      onComplete: () => moveMediaComplete(playlistID, medias, afterID),
      onError: error => ({
        type: MOVE_MEDIA_COMPLETE,
        error: true,
        payload: error,
        meta: { playlistID, medias, afterID }
      })
    }));
  };
}
