import merge from 'deepmerge';
import compose from 'recompose/compose';
import {
  LOAD_SETTINGS,
  CHANGE_SETTING,
} from '../constants/ActionTypes';

// Some people have >100% volumes stored in their localStorage settings
// because of a bug in üWave 1.4. This ensures that _everyone's_ volume
// is between 0 and 100.
function fixVolume(state) {
  if (state.volume < 0) return { ...state, volume: 0 };
  if (state.volume > 100) return { ...state, volume: 100 };
  return state;
}

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

function reduce(state = initialState, action = {}) {
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

export default compose(fixVolume, reduce);
