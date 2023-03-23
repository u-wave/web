import { post } from '../../actions/RequestActionCreators';
import { createPlaylistStart, createPlaylistComplete } from '../../actions/PlaylistActionCreators';
import { IMPORT_PLAYLIST_START, IMPORT_PLAYLIST_COMPLETE } from './constants';

function importPlaylistStart(id, name) {
  return (dispatch) => {
    dispatch(createPlaylistStart({ name }, `yt:${id}`));
    dispatch({
      type: IMPORT_PLAYLIST_START,
      payload: { id, name },
    });
  };
}

function importPlaylistComplete(id, playlist) {
  return (dispatch) => {
    dispatch({
      type: IMPORT_PLAYLIST_COMPLETE,
      payload: { playlist },
      meta: { id },
    });
    dispatch(createPlaylistComplete(playlist, `yt:${id}`));
  };
}

export function importPlaylist(id, name) {
  return post('/import/youtube/importplaylist', { id, name }, {
    onStart: () => importPlaylistStart(id, name),
    onComplete: (playlist) => importPlaylistComplete(id, playlist),
    onError: (error) => ({
      type: IMPORT_PLAYLIST_COMPLETE,
      error: true,
      payload: error,
      meta: { id },
    }),
  });
}
