import { LOAD, SET } from '../constants/actionTypes/settings';

const initialState = {
  language: null,
  mentionSound: true,
  muted: false,
  videoEnabled: true,
  videoSize: 'large',
  volume: 0
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case LOAD:
    // Loading settings defaults to the initial state.
    return { ...initialState, ...payload };
  case SET:
    return { ...state, ...payload };
  default:
    return state;
  }
}
