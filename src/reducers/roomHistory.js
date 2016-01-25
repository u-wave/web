import { ADVANCE, LOAD_HISTORY_COMPLETE } from '../constants/actionTypes/booth';

const initialState = [];

const normalize = entry => ({
  _id: entry._id || entry.historyID,
  user: entry.user,
  media: {
    ...entry.media.media,
    ...entry.media
  },
  timestamp: new Date(entry.timestamp || entry.played).getTime(),
  stats: entry.stats || {
    upvotes: entry.upvotes || [],
    downvotes: entry.downvotes || [],
    favorites: entry.favorites || []
  }
});

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case LOAD_HISTORY_COMPLETE:
    return payload.map(normalize);
  case ADVANCE:
    if (state.some(entry => entry._id === payload.historyID)) {
      return state;
    }
    return [
      ...state,
      normalize(payload)
    ];
  default:
    return state;
  }
}
