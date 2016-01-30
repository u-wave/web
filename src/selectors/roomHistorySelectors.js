import { createSelector } from 'reselect';
import { currentUserSelector } from './userSelectors';

const byTimestamp = (a, b) => a.timestamp < b.timestamp ? 1 : -1;

const baseSelector = state => state.roomHistory;

export const roomHistorySelector = createSelector(
  baseSelector,
  history => history.slice().sort(byTimestamp)
);

const addOwnVoteProps = id => entry => ({
  ...entry,
  stats: {
    ...entry.stats,
    isDownvote: entry.stats.downvotes.indexOf(id) > -1,
    isFavorite: entry.stats.favorites.indexOf(id) > -1,
    isUpvote: entry.stats.upvotes.indexOf(id) > -1
  }
});

export const roomHistoryWithVotesSelector = createSelector(
  roomHistorySelector,
  currentUserSelector,
  (history, user) => user ? history.map(addOwnVoteProps(user._id)) : history
);
