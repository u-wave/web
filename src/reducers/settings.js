import merge from 'deepmerge';
import {
  LOAD_SETTINGS,
  CHANGE_SETTING,
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
    userNameChanged: true,
    skip: true,
  },
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_SETTINGS:
    // Loading settings defaults to the initial state.
      return {
        ...initialState,
        ...payload,
        // Merge notification settings if we have new ones.
        // Needed if new notification types were added since the last time
        // settings were saved to localStorage.
        notifications: payload ? {
          ...initialState.notifications,
          ...payload.notifications,
        } : initialState.notifications,
      };
    case CHANGE_SETTING:
      return merge(state, payload, { clone: true });
    default:
      return state;
  }
}
