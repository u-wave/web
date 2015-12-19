import { LOAD, SET } from '../constants/actionTypes/settings';

const initialState = {
  mentionSound: true,
  muted: false,
  videoSize: 'large',
  volume: 0
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case LOAD:
  case SET:
    return { ...state, ...payload };
  default:
    return state;
  }
}
