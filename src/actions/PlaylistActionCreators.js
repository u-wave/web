import { SHUFFLE_PLAYLIST_START, SHUFFLE_PLAYLIST_COMPLETE } from '../constants/ActionTypes';
import { openEditMediaDialog } from './DialogActionCreators';
import { post } from './RequestActionCreators';
import { setPlaylistFilter, loadPlaylist } from '../reducers/playlists';

// TODO It would be good to get rid of this
export function flattenPlaylistItem(item) {
  return {
    ...item.media,
    ...item,
  };
}

export function filterPlaylistItems(playlistID, filter) {
  return (dispatch) => {
    dispatch(setPlaylistFilter({ playlistID, filter }));
    dispatch(loadPlaylist({ playlistID, page: 0, filter }));
  };
}

export function cannotDeleteActivePlaylist(playlistID) {
  return {
    type: 'cannotDeleteActivePlaylist',
    error: true,
    payload: new Error('The active playlist cannot be deleted. '
      + 'Activate a different playlist first, before deleting this one.'),
    meta: { playlistID },
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
