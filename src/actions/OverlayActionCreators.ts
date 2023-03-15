import { OPEN_OVERLAY, CLOSE_OVERLAY, TOGGLE_OVERLAY } from '../constants/ActionTypes';

export function openOverlay(overlay: string) {
  return {
    type: OPEN_OVERLAY,
    payload: { overlay },
  } as const;
}

export function toggleOverlay(overlay: string) {
  return {
    type: TOGGLE_OVERLAY,
    payload: { overlay },
  } as const;
}

export function closeAll() {
  return { type: CLOSE_OVERLAY } as const;
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
