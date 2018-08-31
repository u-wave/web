import {
  ADVANCE,
  INIT_STATE,
  ENTER_FULLSCREEN,
  EXIT_FULLSCREEN,
} from '../constants/ActionTypes';

const initialState = {
  historyID: null,
  media: null,
  djID: null,
  startTime: null,
  isFullscreen: false,
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case ADVANCE:
      if (payload) {
        return {
          ...state,
          historyID: payload.historyID,
          media: payload.media,
          djID: payload.userID,
          startTime: payload.timestamp, // TODO change this to playedAt
        };
      }
      return {
        ...state,
        historyID: null,
        media: null,
        djID: null,
        startTime: null,
      };
    case INIT_STATE:
      if (payload.booth) {
        return {
          ...state,
          historyID: payload.booth.historyID,
          media: payload.booth.media,
          djID: payload.booth.userID,
          startTime: payload.booth.playedAt,
        };
      }
      return {
        ...state,
        historyID: null,
        media: null,
        djID: null,
        startTime: null,
      };
    case ENTER_FULLSCREEN:
      return {
        ...state,
        isFullscreen: true,
      };
    case EXIT_FULLSCREEN:
      return {
        ...state,
        isFullscreen: false,
      };
    default:
      return state;
  }
}
