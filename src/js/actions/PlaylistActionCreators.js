import { dispatch } from '../dispatcher';
import { del, get, post, put } from '../utils/Request';

export function setPlaylists(playlists) {
  dispatch({
    type: 'loadedPlaylists',
    payload: { playlists }
  });
}

export function flattenPlaylistItem(item) {
  return {
    ...item.media,
    ...item
  };
}

export function loadPlaylist(playlistID) {
  dispatch({
    type: 'loadingPlaylist',
    payload: { playlistID }
  });

  get(`/v1/playlists/${playlistID}/media`)
    .then(res => res.json())
    .then(items => items.map(flattenPlaylistItem))
    .then(media => {
      dispatch({
        type: 'loadedPlaylist',
        payload: { playlistID, media }
      });
    })
    .catch(e => {
      dispatch({
        type: 'loadedPlaylist',
        error: true,
        payload: e
      });
    });
}

export function selectPlaylist(playlistID) {
  dispatch({
    type: 'selectPlaylist',
    payload: { playlistID }
  });

  loadPlaylist(playlistID);
}

export function activatePlaylist(playlistID) {
  dispatch({
    type: 'activatePlaylist',
    payload: { playlistID }
  });
  put(`/v1/playlists/${playlistID}/activate`)
    .then(() => {
      dispatch({
        type: 'activatedPlaylist',
        payload: { playlistID }
      });
    })
    .catch(error => {
      dispatch({
        type: 'activatedPlaylist',
        error: true,
        payload: error,
        meta: { playlistID }
      });
    });
}

function playlistsComplete(playlists) {
  dispatch({
    type: 'loadedPlaylists',
    payload: { playlists }
  });
}

function playlistsError(err) {
  dispatch({
    type: 'loadedPlaylists',
    error: true,
    payload: err
  });
}

export function loadPlaylists() {
  dispatch({ type: 'loadingPlaylists' });
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
    type: 'creatingPlaylist',
    payload: { name, description, shared },
    meta: { tempId }
  });

  post('/v1/playlists', { name, description, shared })
    .then(res => res.json())
    .then(playlist => {
      dispatch({
        type: 'createdPlaylist',
        payload: { playlist },
        meta: { tempId }
      });
    })
    .catch(error => {
      dispatch({
        type: 'createdPlaylist',
        error: true,
        payload: error,
        meta: { tempId }
      });
    });
}

export function addMedia(playlist, items) {
  post(`/v1/playlists/${playlist._id}/media`, { items })
    .then(res => res.json())
    .then(({ added, playlistSize }) => {
      dispatch({
        type: 'addedMediaToPlaylist',
        payload: {
          playlistID: playlist._id,
          newSize: playlistSize,
          appendedMedia: added.map(flattenPlaylistItem)
        }
      });
    })
    .catch(error => {
      dispatch({
        type: 'addedMediaToPlaylist',
        error: true,
        payload: error
      });
    });

  dispatch({
    type: 'addMediaToPlaylist',
    payload: {
      playlistID: playlist._id,
      media: items
    }
  });
}

export function editMedia(playlistID, media) {
  dispatch({
    type: 'showMediaEditDialog',
    payload: { playlistID, media }
  });
}

export function updateMedia(playlistID, mediaID, props) {
  dispatch({
    type: 'updateMedia',
    payload: { playlistID, mediaID, props }
  });
}

export function removeMedia(playlistID, mediaID) {
  // DELETE /v1/playlists/${playlistID}/media/${mediaID}
  const payload = { playlistID, mediaID };
  dispatch({
    type: 'removeMediaFromPlaylist',
    payload
  });
  del(`/v1/playlists/${playlistID}/media/${mediaID}`)
    .then(() => {
      dispatch({
        type: 'removedMediaFromPlaylist',
        payload
      });
    })
    .catch(error => {
      dispatch({
        type: 'removedMediaFromPlaylist',
        error: true,
        payload: error,
        meta: payload
      });
    });
}

export function moveMedia(playlistID, medias, afterID) {
  const payload = { playlistID, medias, afterID };
  // POST
  dispatch({
    type: 'moveMediaInPlaylist',
    payload
  });
  const items = medias.map(media => media._id);
  put(`/v1/playlists/${playlistID}/move`, { items, after: afterID })
    .then(res => res.json())
    .then(() => {
      dispatch({
        type: 'movedMediaInPlaylist',
        payload
      });
    })
    .catch(error => {
      dispatch({
        type: 'movedMediaInPlaylist',
        error: true,
        payload: error,
        meta: payload
      });
    });
}
