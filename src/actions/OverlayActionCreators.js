import { dispatch } from '../dispatcher';

export function openOverlay(overlay) {
  dispatch({
    type: 'openOverlay',
    payload: { overlay }
  });
}

export function toggleOverlay(overlay) {
  dispatch({
    type: 'toggleOverlay',
    payload: { overlay }
  });
}

export function togglePlaylistManager() {
  toggleOverlay('playlistManager');
}

export function closeAll() {
  dispatch({ type: 'closeOverlay' });
}
