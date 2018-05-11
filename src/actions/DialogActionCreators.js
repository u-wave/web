import {
  CLOSE_RESET_PASSWORD_DIALOG,
  OPEN_EDIT_MEDIA_DIALOG, CLOSE_EDIT_MEDIA_DIALOG,
  OPEN_PREVIEW_MEDIA_DIALOG, CLOSE_PREVIEW_MEDIA_DIALOG,
  OPEN_LOGIN_DIALOG, CLOSE_LOGIN_DIALOG,
} from '../constants/ActionTypes';

export function openEditMediaDialog(playlistID, media) {
  return {
    type: OPEN_EDIT_MEDIA_DIALOG,
    payload: { playlistID, media },
  };
}

export function closeEditMediaDialog() {
  return { type: CLOSE_EDIT_MEDIA_DIALOG };
}

export function openPreviewMediaDialog(media) {
  return {
    type: OPEN_PREVIEW_MEDIA_DIALOG,
    payload: { media },
  };
}

export function closePreviewMediaDialog() {
  return {
    type: CLOSE_PREVIEW_MEDIA_DIALOG,
  };
}

export function openLoginDialog() {
  return {
    type: OPEN_LOGIN_DIALOG,
    payload: { show: 'login' },
  };
}
export function openRegisterDialog() {
  return {
    type: OPEN_LOGIN_DIALOG,
    payload: { show: 'register' },
  };
}

export function closeLoginDialog() {
  return { type: CLOSE_LOGIN_DIALOG };
}

export function openResetPasswordDialog() {
  return {
    type: OPEN_LOGIN_DIALOG,
    payload: { show: 'reset' },
  };
}

export function closeResetPasswordDialog() {
  return { type: CLOSE_RESET_PASSWORD_DIALOG };
}
