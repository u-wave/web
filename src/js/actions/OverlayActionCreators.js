import { dispatch } from '../dispatcher';

export function openPlaylistManager() {
  dispatch({
    action: 'openOverlay',
    overlay: 'playlistManager'
  });
}

export function closeAll() {
  dispatch({ action: 'closeOverlay' });
}
