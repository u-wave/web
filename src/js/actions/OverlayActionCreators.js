import { dispatch } from '../dispatcher';

export function openOverlay(overlay) {
  dispatch({
    action: 'openOverlay',
    overlay: overlay
  });
}

export function toggleOverlay(overlay) {
  dispatch({
    action: 'toggleOverlay',
    overlay: overlay
  });
}

export function togglePlaylistManager() {
  toggleOverlay('playlistManager');
}

export function closeAll() {
  dispatch({ action: 'closeOverlay' });
}
