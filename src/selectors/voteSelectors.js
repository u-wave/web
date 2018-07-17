import { createSelector, createStructuredSelector } from 'reselect';
import { currentUserSelector } from './userSelectors';

const baseSelector = state => state.votes;

const createPropSelector = (base, prop) => createSelector(base, obj => obj[prop]);
const createIsSelector = type => createSelector(
  type,
  currentUserSelector,
  (users, me) => !!me && users.includes(me._id),
);
const createCountSelector = type => createSelector(
  type,
  array => array.length,
);

export const favoritesSelector = createPropSelector(baseSelector, 'favorites');
export const upvotesSelector = createPropSelector(baseSelector, 'upvotes');
export const downvotesSelector = createPropSelector(baseSelector, 'downvotes');

export const currentVotesSelector = createStructuredSelector({
  favorites: favoritesSelector,
  upvotes: upvotesSelector,
  downvotes: downvotesSelector,
});

export const isFavoriteSelector = createIsSelector(favoritesSelector);
export const isUpvoteSelector = createIsSelector(upvotesSelector);
export const isDownvoteSelector = createIsSelector(downvotesSelector);

export const favoritesCountSelector = createCountSelector(favoritesSelector);
export const upvotesCountSelector = createCountSelector(upvotesSelector);
export const downvotesCountSelector = createCountSelector(downvotesSelector);

export const currentVoteStatsSelector = createStructuredSelector({
  isFavorite: isFavoriteSelector,
  isUpvote: isUpvoteSelector,
  isDownvote: isDownvoteSelector,
  favoritesCount: favoritesCountSelector,
  upvotesCount: upvotesCountSelector,
  downvotesCount: downvotesCountSelector,
});
