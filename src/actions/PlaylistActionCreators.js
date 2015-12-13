import { del, get, post, put } from '../utils/Request';

export function setPlaylists(playlists) {
  return {
    type: 'loadedPlaylists',
    payload: { playlists }
  };
}

export function flattenPlaylistItem(item) {
  return {
    ...item.media,
    ...item
  };
}

export function loadPlaylist(playlistID) {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;

    dispatch({
      type: 'loadingPlaylist',
      payload: { playlistID }
    });

    get(jwt, `/v1/playlists/${playlistID}/media`)
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
  };
}

export function selectPlaylist(playlistID) {
  return dispatch => {
    dispatch({
      type: 'selectPlaylist',
      payload: { playlistID }
    });

    if (playlistID) {
      dispatch(loadPlaylist(playlistID));
    }
  };
}

export function activatePlaylist(playlistID) {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;

    dispatch({
      type: 'activatePlaylist',
      payload: { playlistID }
    });
    put(jwt, `/v1/playlists/${playlistID}/activate`)
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
  };
}

export function loadPlaylists() {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;

    dispatch({ type: 'loadingPlaylists' });
    get(jwt, '/v1/playlists')
      .then(res => res.json())
      .then(playlists => {
        dispatch({
          type: 'loadedPlaylists',
          payload: { playlists }
        });
      })
      .catch(error => {
        dispatch({
          type: 'loadedPlaylists',
          error: true,
          payload: error
        });
      });
  };
}

export function createPlaylist(name) {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;

    const tempId = -Date.now();
    const description = '';
    const shared = false;
    dispatch({
      type: 'creatingPlaylist',
      payload: { name, description, shared },
      meta: { tempId }
    });

    post(jwt, '/v1/playlists', { name, description, shared })
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
  };
}

export function addMedia(playlist, items) {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;

    dispatch({
      type: 'addMediaToPlaylist',
      payload: {
        playlistID: playlist._id,
        media: items
      }
    });

    post(jwt, `/v1/playlists/${playlist._id}/media`, { items })
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
  };
}

export function editMedia(playlistID, media) {
  return {
    type: 'editMedia',
    payload: { playlistID, media }
  };
}

export function updateMedia(playlistID, mediaID, props) {
  return {
    type: 'updateMedia',
    payload: { playlistID, mediaID, props }
  };
}

export function removeMedia(playlistID, mediaID) {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;

    const payload = { playlistID, mediaID };
    dispatch({
      type: 'removeMediaFromPlaylist',
      payload
    });
    del(jwt, `/v1/playlists/${playlistID}/media/${mediaID}`)
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
  };
}

export function moveMedia(playlistID, medias, afterID) {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;

    const payload = { playlistID, medias, afterID };
    dispatch({
      type: 'moveMediaInPlaylist',
      payload
    });
    const items = medias.map(media => media._id);
    put(jwt, `/v1/playlists/${playlistID}/move`, { items, after: afterID })
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
  };
}
