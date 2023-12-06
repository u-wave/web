import {
  FILTER_PLAYLIST_ITEMS,
  DELETE_PLAYLIST_START, DELETE_PLAYLIST_COMPLETE,
  SHUFFLE_PLAYLIST_START, SHUFFLE_PLAYLIST_COMPLETE,
} from '../constants/ActionTypes';
import { openEditMediaDialog } from './DialogActionCreators';
import { del, post } from './RequestActionCreators';
import {
  activePlaylistIDSelector,
  selectedPlaylistIDSelector,
} from '../selectors/playlistSelectors';
import { selectPlaylist, loadPlaylist } from '../reducers/playlists';

// TODO It would be good to get rid of this
export function flattenPlaylistItem(item) {
  return {
    ...item.media,
    ...item,
  };
}

export function filterPlaylistItems(playlistID, filter) {
  return (dispatch) => {
    dispatch({
      type: FILTER_PLAYLIST_ITEMS,
      payload: { playlistID, filter },
    });

    dispatch(loadPlaylist({ playlistID, page: 0, filter }));
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
