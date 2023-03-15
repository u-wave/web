import { createSelector } from 'reselect';
import {
  historyIDSelector, mediaSelector, startTimeSelector, djSelector,
} from './boothSelectors';
import { currentUserSelector } from './userSelectors';
import { currentVotesSelector } from './voteSelectors';

const byTimestamp = (a, b) => (a.timestamp < b.timestamp ? 1 : -1);

/** @param {import('../redux/configureStore').StoreState} state */
const baseSelector = (state) => state.roomHistory;

export const roomHistorySelector = createSelector(
  baseSelector,
  (history) => history.slice().sort(byTimestamp),
);

/**
* @param {string|null} id
* @returns {<T extends { stats: { downvotes: string[], upvotes: string[], favorites: string[] } }>(entry: T) => T}
*/
const addOwnVoteProps = (id) => (entry) => ({
  ...entry,
  stats: {
    ...entry.stats,
    // No ID is provided for guest users.
    isDownvote: !!id && entry.stats.downvotes.includes(id),
    isFavorite: !!id && entry.stats.favorites.includes(id),
    isUpvote: !!id && entry.stats.upvotes.includes(id),
  },
});

export const currentPlaySelector = createSelector(
  currentUserSelector,
  historyIDSelector,
  mediaSelector,
  startTimeSelector,
  djSelector,
  currentVotesSelector,
  (user, historyID, media, timestamp, dj, stats) => {
    if (!historyID) {
      return null;
    }
    const entry = {
      _id: historyID,
      user: dj,
      media,
      timestamp,
      stats,
    };
    return addOwnVoteProps(user ? user._id : null)(entry);
  },
);

export const roomHistoryWithVotesSelector = createSelector(
  roomHistorySelector,
  currentUserSelector,
  currentPlaySelector,
  (history, user, current) => {
    const roomHistory = history.map(addOwnVoteProps(user ? user._id : null));
    if (current) {
      roomHistory.unshift(current);
    }
    return roomHistory;
  },
);
