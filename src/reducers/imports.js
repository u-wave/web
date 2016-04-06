import {
  SHOW_IMPORT_PANEL
} from '../constants/actionTypes/imports';

const initialState = {
  showPanel: false,
  sourceType: null
};

export default function reduce(state = initialState, action = {}) {
  const { type } = action;
  switch (type) {
  case SHOW_IMPORT_PANEL:
    return {
      ...state,
      showPanel: true
    };
  default:
    return state;
  }
}
