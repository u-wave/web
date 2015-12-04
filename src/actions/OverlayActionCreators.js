export function openOverlay(overlay) {
  return {
    type: 'openOverlay',
    payload: { overlay }
  };
}

export function toggleOverlay(overlay) {
  return {
    type: 'toggleOverlay',
    payload: { overlay }
  };
}

export function togglePlaylistManager() {
  return toggleOverlay('playlistManager');
}

export function closeAll() {
  return { type: 'closeOverlay' };
}
