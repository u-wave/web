import { createSelector, createStructuredSelector } from 'reselect';
import { currentUserSelector } from './userSelectors';

const baseSelector = (state) => state.votes;

const createPropSelector = (base, prop) => createSelector(base, (obj) => obj[prop]);
const createIsSelector = (type) => createSelector(
  type,
  currentUserSelector,
  (users, me) => !!me && users.includes(me._id),
);
const createCountSelector = (type) => createSelector(
  type,
  (array) => array.length,
);

export const favoritesSelector = createPropSelector(baseSelector, 'favorites');
export const upvotesSelector = createPropSelector(baseSelector, 'upvotes');
export const downvotesSelector = createPropSelector(baseSelector, 'downvotes');
export const sadvotesSelector = createPropSelector(baseSelector, 'sadvotes');

export const currentVotesSelector = createStructuredSelector({
  favorites: favoritesSelector,
  upvotes: upvotesSelector,
  downvotes: downvotesSelector,
  sadvotes: sadvotesSelector,
});

export const isFavoriteSelector = createIsSelector(favoritesSelector);
export const isUpvoteSelector = createIsSelector(upvotesSelector);
export const isDownvoteSelector = createIsSelector(downvotesSelector);
export const isSadvoteSelector = createIsSelector(sadvotesSelector);

export const favoritesCountSelector = createCountSelector(favoritesSelector);
export const upvotesCountSelector = createCountSelector(upvotesSelector);
export const downvotesCountSelector = createCountSelector(downvotesSelector);
export const sadvotesCountSelector = createCountSelector(sadvotesSelector);

export const currentVoteStatsSelector = createStructuredSelector({
  isFavorite: isFavoriteSelector,
  isUpvote: isUpvoteSelector,
  isDownvote: isDownvoteSelector,
  isSadvote: isSadvoteSelector,
  favoritesCount: favoritesCountSelector,
  upvotesCount: upvotesCountSelector,
  downvotesCount: downvotesCountSelector,
  sadvotesCount: sadvotesCountSelector,
});
