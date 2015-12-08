const initialState = {
  historyID: null,
  media: null,
  djID: null,
  startTime: null
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case 'advance':
    return {
      ...state,
      historyID: payload.historyID,
      media: payload.media,
      djID: payload.userID,
      startTime: payload.timestamp
    };
  default:
    return state;
  }
}
