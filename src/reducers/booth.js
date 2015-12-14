import { ADVANCE } from '../constants/actionTypes/booth';

const initialState = {
  historyID: null,
  media: null,
  djID: null,
  startTime: null
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
        startTime: payload.timestamp
      };
    }
    return {
      ...state,
      historyID: null,
      media: null,
      djID: null,
      startTime: null
    };
  default:
    return state;
  }
}
