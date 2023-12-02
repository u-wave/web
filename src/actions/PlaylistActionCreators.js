import {
  LOAD_PLAYLIST_START, LOAD_PLAYLIST_COMPLETE,
  FILTER_PLAYLIST_ITEMS,
  FILTER_PLAYLIST_ITEMS_START, FILTER_PLAYLIST_ITEMS_COMPLETE,
  PLAYLIST_CYCLED,
  DELETE_PLAYLIST_START, DELETE_PLAYLIST_COMPLETE,
  UPDATE_MEDIA_START, UPDATE_MEDIA_COMPLETE,
  SHUFFLE_PLAYLIST_START, SHUFFLE_PLAYLIST_COMPLETE,
} from '../constants/ActionTypes';
import { openEditMediaDialog } from './DialogActionCreators';
import {
  del, get, post, put,
} from './RequestActionCreators';
import {
  playlistItemFilterSelector,
  activePlaylistIDSelector,
  selectedPlaylistIDSelector,
  activePlaylistSelector,
  selectedPlaylistSelector,
} from '../selectors/playlistSelectors';
import mergeIncludedModels from '../utils/mergeIncludedModels';
import { selectPlaylist } from '../reducers/playlists';

const MEDIA_PAGE_SIZE = 50;

// TODO It would be good to get rid of this
export function flattenPlaylistItem(item) {
  return {
    ...item.media,
    ...item,
  };
}

export function loadPlaylistStart(playlistID, page, { sneaky = false } = {}) {
  return {
    type: LOAD_PLAYLIST_START,
    payload: { playlistID },
    meta: { page, sneaky },
  };
}

export function loadPlaylistComplete(playlistID, media, pagination) {
  return {
    type: LOAD_PLAYLIST_COMPLETE,
    payload: { playlistID, media },
    meta: pagination,
  };
}

export function loadPlaylist(playlistID, page = 0, meta = {}) {
  return get(`/playlists/${playlistID}/media`, {
    qs: { page, limit: MEDIA_PAGE_SIZE },
    onStart: () => loadPlaylistStart(playlistID, page, meta),
    onComplete: (res) => loadPlaylistComplete(
      playlistID,
      mergeIncludedModels(res).map(flattenPlaylistItem),
      {
        page: res.meta.offset / res.meta.pageSize,
        pageSize: res.meta.pageSize,
        size: res.meta.total,
      },
    ),
    onError: (error) => ({
      type: LOAD_PLAYLIST_COMPLETE,
      error: true,
      payload: error,
      meta: { page },
    }),
  });
}

export function filterPlaylistItemsStart(playlistID, page, filter) {
  return {
    type: FILTER_PLAYLIST_ITEMS_START,
    payload: { playlistID, filter },
    meta: { page },
  };
}

export function filterPlaylistItemsComplete(playlistID, media, pagination) {
  return {
    type: FILTER_PLAYLIST_ITEMS_COMPLETE,
    payload: { playlistID, media },
    meta: pagination,
  };
}

export function loadFilteredPlaylistItems(playlistID, page = 0) {
  return (dispatch, getState) => {
    const filter = playlistItemFilterSelector(getState()) ?? '';
    return dispatch(get(`/playlists/${playlistID}/media`, {
      qs: { filter, page, limit: MEDIA_PAGE_SIZE },
      onStart: () => filterPlaylistItemsStart(playlistID, page, filter),
      onComplete: (res) => filterPlaylistItemsComplete(
        playlistID,
        mergeIncludedModels(res).map(flattenPlaylistItem),
        {
          page: res.meta.offset / res.meta.pageSize,
          pageSize: res.meta.pageSize,
          size: res.meta.results,
          filter,
        },
      ),
      onError: (error) => ({
        type: FILTER_PLAYLIST_ITEMS_COMPLETE,
        error: true,
        payload: error,
        meta: { page },
      }),
    }));
  };
}

export function filterPlaylistItems(playlistID, filter) {
  return (dispatch) => {
    dispatch({
      type: FILTER_PLAYLIST_ITEMS,
      payload: { playlistID, filter },
    });

    const loadAll = loadPlaylist(playlistID, 0);
    const loadFiltered = loadFilteredPlaylistItems(playlistID, 0);
    dispatch(filter === '' ? loadAll : loadFiltered);
  };
}

export function playlistCycled(playlistID) {
  return {
    type: PLAYLIST_CYCLED,
    payload: { playlistID },
  };
}

function shouldLoadAfterCycle(playlist) {
  const { media } = playlist;
  // If the playlist was fully loaded, we can cycle naively
  if (media.length === playlist.size && media.every(Boolean)) {
    return false;
  }
  // If the first page _after_ cycle is fully loaded, we also don't need to do
  // anything.
  if (media.length > MEDIA_PAGE_SIZE
      && media.slice(1, 1 + MEDIA_PAGE_SIZE).every(Boolean)) {
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
    payload: { playlistID },
  };
}

export function deletePlaylistComplete(playlistID) {
  return {
    type: DELETE_PLAYLIST_COMPLETE,
    payload: { playlistID },
  };
}

export function cannotDeleteActivePlaylist(playlistID) {
  return {
    type: DELETE_PLAYLIST_COMPLETE,
    error: true,
    payload: new Error('The active playlist cannot be deleted. '
      + 'Activate a different playlist first, before deleting this one.'),
    meta: { playlistID },
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
      onError: (error) => ({
        type: DELETE_PLAYLIST_COMPLETE,
        error: true,
        payload: error,
        meta: { playlistID },
      }),
    }));
  };
}

export function editMedia(playlistID, media) {
  return openEditMediaDialog(playlistID, media);
}

export function updateMediaStart(playlistID, mediaID, props) {
  return {
    type: UPDATE_MEDIA_START,
    payload: { playlistID, mediaID, props },
  };
}

export function updateMediaComplete(playlistID, mediaID, media) {
  return {
    type: UPDATE_MEDIA_COMPLETE,
    payload: { playlistID, mediaID, media },
  };
}

export function updateMedia(playlistID, mediaID, props) {
  return put(`/playlists/${playlistID}/media/${mediaID}`, props, {
    onStart: () => updateMediaStart(playlistID, mediaID, props),
    onComplete: (res) => updateMediaComplete(playlistID, mediaID, res.data),
    onError: (error) => ({
      type: UPDATE_MEDIA_COMPLETE,
      payload: error,
      error: true,
      meta: { playlistID, mediaID, props },
    }),
  });
}

export function shufflePlaylistStart(playlistID) {
  return {
    type: SHUFFLE_PLAYLIST_START,
    payload: { playlistID },
  };
}

export function shufflePlaylistComplete(playlistID) {
  return (dispatch) => {
    dispatch({
      type: SHUFFLE_PLAYLIST_COMPLETE,
      payload: { playlistID },
    });
  };
}

export function shufflePlaylist(playlistID) {
  return (dispatch) => {
    const shuffleOperation = post(`/playlists/${playlistID}/shuffle`, {}, {
      onStart: () => shufflePlaylistStart(playlistID),
      // onComplete: () => shufflePlaylistComplete(playlistID),
      onError: (error) => ({
        type: SHUFFLE_PLAYLIST_COMPLETE,
        error: true,
        payload: error,
        meta: { playlistID },
      }),
    });
    const loadOperation = loadPlaylist(playlistID, 0, { sneaky: true });

    return dispatch(shuffleOperation)
      .then(() => dispatch(loadOperation))
      .then(() => dispatch(shufflePlaylistComplete(playlistID)));
  };
}
