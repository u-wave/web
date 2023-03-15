import {
  OPEN_EDIT_MEDIA_DIALOG, CLOSE_EDIT_MEDIA_DIALOG,
  OPEN_PREVIEW_MEDIA_DIALOG, CLOSE_PREVIEW_MEDIA_DIALOG,
  OPEN_LOGIN_DIALOG, CLOSE_LOGIN_DIALOG,
} from '../constants/ActionTypes';

const initialState = {
  editMedia: {
    open: false,
    payload: {},
  },
  previewMedia: {
    open: false,
    payload: {},
  },
  login: {
    open: false,
    payload: {},
  },
};

const openDialog = (state, name, payload, open = true) => ({
  ...state,
  [name]: {
    open,
    payload,
  },
});
const closeDialog = (state, name) => ({
  ...state,
  [name]: {
    open: false,
    payload: state[name].payload,
  },
});

export default function reduce(state = initialState, action) {
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
