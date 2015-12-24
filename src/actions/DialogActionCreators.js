import {
  OPEN_EDIT_MEDIA_DIALOG, CLOSE_EDIT_MEDIA_DIALOG
} from '../constants/actionTypes/dialogs';

export function openEditMediaDialog(playlistID, media) {
  return {
    type: OPEN_EDIT_MEDIA_DIALOG,
    payload: { playlistID, media }
  };
}

export function closeEditMediaDialog() {
  return { type: CLOSE_EDIT_MEDIA_DIALOG };
}
