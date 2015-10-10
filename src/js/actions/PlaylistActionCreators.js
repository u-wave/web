import { dispatch } from '../dispatcher';
import { get, post } from '../utils/Request';

export function setPlaylists(playlists) {
  dispatch({
    action: 'playlists',
    playlists: playlists
  });
}

export function selectPlaylist(playlistID) {
  dispatch({
    action: 'selectPlaylist',
    playlistID: playlistID
  });
}

export function setActivePlaylist(playlistID) {
  dispatch({
    action: 'setActivePlaylist',
    playlistID: playlistID
  });
}

function playlistsComplete(playlists) {
  dispatch({
    action: 'playlists',
    playlists: playlists
  });
}

function playlistsError(err) {
  dispatch({
    action: 'playlistsError',
    error: err,
    message: err.message
  });
}

export function loadPlaylists() {
  dispatch({ action: 'loadingPlaylists' });
  get('/v1/playlists')
    .then(res => res.json())
    .then(playlistsComplete)
    .catch(playlistsError);
}

export function createPlaylist(name) {
  const tempId = -Date.now();
  const description = '';
  const shared = false;
  dispatch({
    action: 'creatingPlaylist',
    tempId,
    name, description, shared
  });

  post('/v1/playlists', { name, description, shared })
    .then(res => res.json())
    .then(playlist => {
      dispatch({
        action: 'createdPlaylist',
        tempId, playlist
      });
    })
    .catch(error => {
      const { message } = error;
      dispatch({
        action: 'createPlaylistError',
        tempId, error, message
      });
    });
}

export function addMedia(playlist, media) {
  // POST /v1/playlists/${playlist._id}/media
  dispatch({
    action: 'addMediaToPlaylist',
    playlistID: playlist._id,
    media: media
  });
}

export function editMedia(playlistID, media) {
  dispatch({
    action: 'showMediaEditDialog',
    playlistID: playlistID,
    media: media
  });
}

export function updateMedia(playlistID, mediaID, props) {
  dispatch({
    action: 'updateMedia',
    playlistID: playlistID,
    mediaID: mediaID,
    props: props
  });
}

export function removeMedia(playlistID, mediaID) {
  // DELETE /v1/playlists/${playlistID}/media/${mediaID}
  dispatch({
    action: 'removeMedia',
    playlistID: playlistID,
    mediaID: mediaID
  });
}

export function moveMedia(playlistID, medias, afterID) {
  // POST
  dispatch({
    action: 'moveMediaInPlaylist',
    playlistID: playlistID,
    medias: medias,
    after: afterID
  });
}

export function search(query) {
  dispatch({
    action: 'searchStart',
    query
  });
  return get('/v1/search', { query })
    .then(res => res.json())
    .then(results => {
      dispatch({
        action: 'searchComplete',
        results
      });
    });
}
