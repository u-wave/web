import { createSelector } from 'reselect';
import {
  historyIDSelector, mediaSelector, startTimeSelector, djSelector
} from './boothSelectors';
import { currentUserSelector } from './userSelectors';
import { currentVotesSelector } from './voteSelectors';

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

export const currentPlaySelector = createSelector(
  currentUserSelector,
  historyIDSelector,
  mediaSelector,
  startTimeSelector,
  djSelector,
  currentVotesSelector,
  (user, _id, media, timestamp, dj, stats) =>
    _id ? addOwnVoteProps(user._id)({
      _id,
      user: dj,
      media, timestamp, stats
    }) : null
);

export const roomHistoryWithVotesSelector = createSelector(
  roomHistorySelector,
  currentUserSelector,
  currentPlaySelector,
  (history, user, current) => {
    const roomHistory = user ? history.map(addOwnVoteProps(user._id)) : history;
    if (current) {
      roomHistory.unshift(current);
    }
    return roomHistory;
  }
);
