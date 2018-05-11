import { OPEN_ADD_MEDIA_MENU, CLOSE_ADD_MEDIA_MENU } from '../constants/ActionTypes';

const initialState = {
  open: false,
  position: { x: 0, y: 0 },
  playlists: [],
  type: null,
  data: null,
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload, meta } = action;
  switch (type) {
    case OPEN_ADD_MEDIA_MENU:
      return {
        ...state,
        open: true,
        type: meta.type,
        position: meta.position,
        playlists: meta.playlists,
        data: payload,
      };
    case CLOSE_ADD_MEDIA_MENU:
      return initialState;
    default:
      return state;
  }
}
