import { get, post } from '../../actions/RequestActionCreators';

import {
  createPlaylistStart,
  createPlaylistComplete,
} from '../../actions/PlaylistActionCreators';

import {
  GET_IMPORTABLE_PLAYLIST_START,
  GET_IMPORTABLE_PLAYLIST_COMPLETE,
  GET_CHANNEL_PLAYLISTS_START,
  GET_CHANNEL_PLAYLISTS_COMPLETE,
  IMPORT_PLAYLIST_START,
  IMPORT_PLAYLIST_COMPLETE,
} from './constants';

function getImportablePlaylistStart(url) {
  return {
    type: GET_IMPORTABLE_PLAYLIST_START,
    payload: { url },
  };
}

function getImportablePlaylistComplete(url, playlist, items) {
  return {
    type: GET_IMPORTABLE_PLAYLIST_COMPLETE,
    payload: { url, playlist, items },
  };
}

export function getImportablePlaylist(url) {
  return get('/import/youtube/playlist', {
    qs: { url },
    onStart: () => getImportablePlaylistStart(url),
    onComplete: ({ playlist, items }) => getImportablePlaylistComplete(url, playlist, items),
    onError: error => ({
      type: GET_IMPORTABLE_PLAYLIST_COMPLETE,
      error: true,
      payload: error,
      meta: { url },
    }),
  });
}

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
    onComplete: playlist => importPlaylistComplete(id, playlist),
    onError: error => ({
      type: IMPORT_PLAYLIST_COMPLETE,
      error: true,
      payload: error,
      meta: { id },
    }),
  });
}

function getChannelPlaylistsStart(url) {
  return {
    type: GET_CHANNEL_PLAYLISTS_START,
    payload: { url },
  };
}

function getChannelPlaylistsComplete(channel, playlists) {
  return {
    type: GET_CHANNEL_PLAYLISTS_COMPLETE,
    payload: {
      channel,
      playlists,
    },
  };
}

export function getChannelPlaylists(url) {
  return get('/import/youtube/channel', {
    qs: { url },
    onStart: () => getChannelPlaylistsStart(url),
    onComplete: ({ channel, playlists }) => getChannelPlaylistsComplete(channel, playlists),
    onError: error => ({
      type: GET_CHANNEL_PLAYLISTS_COMPLETE,
      error: true,
      payload: error,
      meta: { url },
    }),
  });
}
