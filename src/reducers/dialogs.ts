import type { AnyAction } from 'redux';
import { createSelector } from '@reduxjs/toolkit';
import type { Media } from './booth';
import type { StoreState } from '../redux/configureStore';
import {
  OPEN_EDIT_MEDIA_DIALOG, CLOSE_EDIT_MEDIA_DIALOG,
  OPEN_PREVIEW_MEDIA_DIALOG, CLOSE_PREVIEW_MEDIA_DIALOG,
  OPEN_LOGIN_DIALOG, CLOSE_LOGIN_DIALOG,
} from '../constants/ActionTypes';

interface EditMediaState {
  playlistID: string;
  media: Media,
}

interface PreviewMediaState {
  media: Media,
}

interface LoginState {
  show: 'login' | 'register' | 'reset',
}

type DialogState<T> =
  | { open: false, payload: null | T }
  | { open: true, payload: T };

interface State {
  editMedia: DialogState<EditMediaState>,
  previewMedia: DialogState<PreviewMediaState>,
  login: DialogState<LoginState>,
}

const initialState: State = {
  editMedia: {
    open: false,
    payload: null,
  },
  previewMedia: {
    open: false,
    payload: null,
  },
  login: {
    open: false,
    payload: null,
  },
};

const openDialog = <K extends keyof State>(state: State, name: K, payload: State[K]['payload'], open = true) => ({
  ...state,
  [name]: {
    open,
    payload,
  },
});
const closeDialog = (state: State, name: keyof State) => ({
  ...state,
  [name]: {
    open: false,
    payload: state[name].payload,
  },
});

export default function reduce(state = initialState, action: AnyAction) {
  const { type, payload } = action;
  switch (type) {
    case OPEN_EDIT_MEDIA_DIALOG:
      return openDialog(state, 'editMedia', payload);
    case CLOSE_EDIT_MEDIA_DIALOG:
      return closeDialog(state, 'editMedia');
    case OPEN_PREVIEW_MEDIA_DIALOG:
      return openDialog(state, 'previewMedia', payload);
    case CLOSE_PREVIEW_MEDIA_DIALOG:
      return closeDialog(state, 'previewMedia');
    case OPEN_LOGIN_DIALOG:
      return openDialog(state, 'login', payload);
    case CLOSE_LOGIN_DIALOG:
      return closeDialog(state, 'login');
    default:
      return state;
  }
}

function baseSelector(state: StoreState) {
  return state.dialogs;
}

function merge<T>(dialog: DialogState<T>) {
  return { ...dialog.payload, open: dialog.open };
}

export const loginDialogSelector = createSelector(
  [baseSelector],
  (dialogs) => merge(dialogs.login),
);

export const editMediaDialogSelector = createSelector(
  [baseSelector],
  (dialogs) => merge(dialogs.editMedia),
);

export const previewMediaDialogSelector = createSelector(
  [baseSelector],
  (dialogs) => merge(dialogs.previewMedia),
);

export function isPreviewMediaDialogOpenSelector(state: StoreState) {
  return state.dialogs.previewMedia && !!state.dialogs.previewMedia.open;
}
