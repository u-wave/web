import { get, post } from '../../utils/Request';
import { tokenSelector } from '../../selectors/userSelectors';

import {
  createPlaylistStart,
  createPlaylistComplete
} from '../../actions/PlaylistActionCreators';

import {
  GET_IMPORTABLE_PLAYLIST_START,
  GET_IMPORTABLE_PLAYLIST_COMPLETE,
  GET_CHANNEL_PLAYLISTS_START,
  GET_CHANNEL_PLAYLISTS_COMPLETE,
  IMPORT_PLAYLIST_START,
  IMPORT_PLAYLIST_COMPLETE
} from './constants';

function getImportablePlaylistStart(url) {
  return {
    type: GET_IMPORTABLE_PLAYLIST_START,
    payload: { url }
  };
}

function getImportablePlaylistComplete(url, playlist, items) {
  return {
    type: GET_IMPORTABLE_PLAYLIST_COMPLETE,
    payload: { url, playlist, items }
  };
}

export function getImportablePlaylist(url) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());

    dispatch(getImportablePlaylistStart(url));

    return get(jwt, '/v1/import/youtube/playlist', { url })
      .then(res => res.json())
      .then(({ playlist, items }) => dispatch(
        getImportablePlaylistComplete(url, playlist, items)
      ))
      .catch(error => dispatch({
        type: GET_IMPORTABLE_PLAYLIST_COMPLETE,
        error: true,
        payload: error,
        meta: { url }
      }));
  };
}

function importPlaylistStart(id, name) {
  return dispatch => {
    dispatch(createPlaylistStart({ name }, `yt:${id}`));
    dispatch({
      type: IMPORT_PLAYLIST_START,
      payload: { id, name }
    });
  };
}

function importPlaylistComplete(id, playlist) {
  return dispatch => {
    dispatch({
      type: IMPORT_PLAYLIST_COMPLETE,
      payload: { playlist },
      meta: { id }
    });
    dispatch(createPlaylistComplete(playlist, `yt:${id}`));
  };
}

export function importPlaylist(id, name) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());

    dispatch(importPlaylistStart(id, name));

    return post(jwt, '/v1/import/youtube/importplaylist', { id, name })
      .then(res => res.json())
      .then(playlist => dispatch(
        importPlaylistComplete(id, playlist)
      ))
      .catch(error => dispatch({
        type: IMPORT_PLAYLIST_COMPLETE,
        error: true,
        payload: error,
        meta: { id }
      }));
  };
}

function getChannelPlaylistsStart(url) {
  return {
    type: GET_CHANNEL_PLAYLISTS_START,
    payload: { url }
  };
}

function getChannelPlaylistsComplete(channel, playlists) {
  return {
    type: GET_CHANNEL_PLAYLISTS_COMPLETE,
    payload: {
      channel,
      playlists
    }
  };
}

export function getChannelPlaylists(url) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());

    dispatch(getChannelPlaylistsStart(url));

    return get(jwt, '/v1/import/youtube/channel', { url })
      .then(res => res.json())
      .then(({ channel, playlists }) => dispatch(
        getChannelPlaylistsComplete(channel, playlists)
      ))
      .catch(error => dispatch({
        type: GET_CHANNEL_PLAYLISTS_COMPLETE,
        error: true,
        payload: error,
        meta: { url }
      }));
  };
}
