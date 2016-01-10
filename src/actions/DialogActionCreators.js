import {
  OPEN_EDIT_MEDIA_DIALOG, CLOSE_EDIT_MEDIA_DIALOG,
  OPEN_LOGIN_DIALOG, CLOSE_LOGIN_DIALOG
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

export function openLoginDialog() {
  return {
    type: OPEN_LOGIN_DIALOG,
    payload: { show: 'login' }
  };
}
export function openRegistorDialog() {
  return {
    type: OPEN_LOGIN_DIALOG,
    payload: { show: 'register' }
  };
}

export function closeLoginDialog() {
  return { type: CLOSE_LOGIN_DIALOG };
}
