import { ADVANCE, LOAD_HISTORY_COMPLETE } from '../constants/ActionTypes';

const initialState = [];

const normalize = entry => ({
  _id: entry._id || entry.historyID,
  user: entry.user,
  media: {
    ...entry.media.media,
    ...entry.media,
  },
  timestamp: new Date(entry.timestamp || entry.playedAt).getTime(),
  stats: entry.stats || {
    upvotes: entry.upvotes || [],
    downvotes: entry.downvotes || [],
    favorites: entry.favorites || [],
  },
});

export default function reduce(state = initialState, action = {}) {
  const { type, payload, meta } = action;
  switch (type) {
    case LOAD_HISTORY_COMPLETE:
      return payload.map(normalize);
    case ADVANCE: {
      const mostRecent = state[0];
      // If the currently playing track is already in the history, remove it--
      // it'll be added back on the next advance, and will be handled by the
      // roomHistorySelector in the mean time.
      if (mostRecent && payload && mostRecent._id === payload.historyID) {
        return state.slice(1);
      }
      if (!meta || !meta.previous) {
        return state;
      }
      return [normalize(meta.previous), ...state];
    }
    default:
      return state;
  }
}
