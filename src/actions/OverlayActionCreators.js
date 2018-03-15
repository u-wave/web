import { OPEN_OVERLAY, CLOSE_OVERLAY, TOGGLE_OVERLAY } from '../constants/actionTypes/overlay';

export function openOverlay(overlay) {
  return {
    type: OPEN_OVERLAY,
    payload: { overlay },
  };
}

export function toggleOverlay(overlay) {
  return {
    type: TOGGLE_OVERLAY,
    payload: { overlay },
  };
}

export function toggleRoomHistory() {
  return toggleOverlay('roomHistory');
}

export function togglePlaylistManager() {
  return toggleOverlay('playlistManager');
}

export function toggleSettings() {
  return toggleOverlay('settings');
}

export function toggleAbout() {
  return toggleOverlay('about');
}

export function toggleAdmin() {
  return toggleOverlay('admin');
}

export function closeAll() {
  return { type: CLOSE_OVERLAY };
}
