import {
  OPEN_ADD_MEDIA_MENU, CLOSE_ADD_MEDIA_MENU
} from '../constants/actionTypes/playlists';

const initialState = {
  open: false,
  position: { x: 0, y: 0 },
  media: []
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case OPEN_ADD_MEDIA_MENU:
    return {
      ...state,
      ...payload,
      open: true
    };
  case CLOSE_ADD_MEDIA_MENU:
    return {
      ...state,
      media: [],
      open: false
    };
  default:
    return state;
  }
}
