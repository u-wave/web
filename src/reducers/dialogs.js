import {
  OPEN_EDIT_MEDIA_DIALOG, CLOSE_EDIT_MEDIA_DIALOG
} from '../constants/actionTypes/dialogs';

const initialState = {
  editMedia: {
    open: false,
    payload: {}
  }
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case OPEN_EDIT_MEDIA_DIALOG:
    return {
      ...state,
      editMedia: {
        open: true,
        payload
      }
    };
  case CLOSE_EDIT_MEDIA_DIALOG:
    return {
      ...state,
      editMedia: {
        open: false,
        payload: {}
      }
    };
  default:
    return state;
  }
}
