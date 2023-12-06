import {
  FILTER_PLAYLIST_ITEMS,
  FILTER_PLAYLIST_ITEMS_START, FILTER_PLAYLIST_ITEMS_COMPLETE,
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
} from '../selectors/playlistSelectors';
import mergeIncludedModels from '../utils/mergeIncludedModels';
import { selectPlaylist, loadPlaylist } from '../reducers/playlists';

const MEDIA_PAGE_SIZE = 50;

// TODO It would be good to get rid of this
export function flattenPlaylistItem(item) {
  return {
    ...item.media,
    ...item,
  };
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

    const loadAll = loadPlaylist({ playlistID, page: 0 });
    const loadFiltered = loadFilteredPlaylistItems(playlistID, 0);
    dispatch(filter === '' ? loadAll : loadFiltered);
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
    const loadOperation = loadPlaylist({ playlistID, page: 0, sneaky: true });

    return dispatch(shuffleOperation)
      .then(() => dispatch(loadOperation))
      .then(() => dispatch(shufflePlaylistComplete(playlistID)));
  };
}
