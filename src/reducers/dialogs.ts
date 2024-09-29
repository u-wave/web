import { type PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit';
import type { Media } from './booth';
import type { StoreState } from '../redux/configureStore';

interface EditMediaState {
  playlistID: string;
  media: Media;
}

interface PreviewMediaState {
  media: Media;
}

interface LoginState {
  show: 'login';
}
interface RegisterState {
  show: 'register';
}
interface ResetPasswordState {
  show: 'reset';
}
interface SocialLoginState {
  show: 'social';
  service: string;
  id: string;
  suggestedName: string;
  avatars: string[];
}

type DialogState<T> =
  | { open: false, payload: null | T }
  | { open: true, payload: T };

interface State {
  editMedia: DialogState<EditMediaState>;
  previewMedia: DialogState<PreviewMediaState>;
  login: DialogState<LoginState | RegisterState | ResetPasswordState | SocialLoginState>;
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

const slice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    openEditMediaDialog(state, action: PayloadAction<EditMediaState>) {
      return openDialog(state, 'editMedia', action.payload);
    },
    openPreviewMediaDialog(state, action: PayloadAction<PreviewMediaState>) {
      return openDialog(state, 'previewMedia', action.payload);
    },
    openLoginDialog(state, action: PayloadAction<
      LoginState | RegisterState | ResetPasswordState | SocialLoginState
    >) {
      return openDialog(state, 'login', action.payload);
    },
    closeEditMediaDialog(state) {
      return closeDialog(state, 'editMedia');
    },
    closePreviewMediaDialog(state) {
      return closeDialog(state, 'previewMedia');
    },
    closeLoginDialog(state) {
      return closeDialog(state, 'login');
    },
  },
});

export default slice.reducer;

export const {
  closeEditMediaDialog,
  closeLoginDialog,
  closePreviewMediaDialog,
  openEditMediaDialog,
  openLoginDialog,
  openPreviewMediaDialog,
} = slice.actions;

function baseSelector(state: StoreState) {
  return state.dialogs;
}

function merge<T>(dialog: DialogState<T>): Partial<T> & { open: boolean } {
  if (dialog.payload != null) {
    return { ...dialog.payload, open: dialog.open };
  }
  return { open: dialog.open } as Partial<T> & { open: boolean };
}

export const loginDialogSelector = createSelector(
  [baseSelector],
  (dialogs) => merge(dialogs.login),
);

export const editMediaDialogSelector = createSelector(
  [baseSelector],
  (dialogs) => dialogs.editMedia,
);

export const previewMediaDialogSelector = createSelector(
  [baseSelector],
  (dialogs) => dialogs.previewMedia,
);

export function isPreviewMediaDialogOpenSelector(state: StoreState) {
  return state.dialogs.previewMedia && !!state.dialogs.previewMedia.open;
}
