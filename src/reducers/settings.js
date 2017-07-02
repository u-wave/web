import merge from 'deepmerge';
import {
  LOAD_SETTINGS,
  CHANGE_SETTING
} from '../constants/actionTypes/settings';

const initialState = {
  language: null,
  mentionSound: true,
  muted: false,
  videoEnabled: true,
  videoSize: 'large',
  volume: 0,
  notifications: {
    userJoin: true,
    userLeave: true,
    userNameChanged: true
  }
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case LOAD_SETTINGS:
    // Loading settings defaults to the initial state.
    return { ...initialState, ...payload };
  case CHANGE_SETTING:
    return merge(state, payload, { clone: true });
  default:
    return state;
  }
}
