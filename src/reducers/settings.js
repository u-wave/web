import { LOAD, SET } from '../constants/actionTypes/settings';

const initialState = {
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
    // It still needs merging, because we might've added setting properties
    // since the last time this user joined, and we do need to add those in too.
    return { ...initialState, ...payload };
  case SET:
    return { ...state, ...payload };
  default:
    return state;
  }
}
