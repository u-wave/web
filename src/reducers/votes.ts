import type { AnyAction } from 'redux';
import { createStructuredSelector } from 'reselect';
import type { StoreState } from '../redux/configureStore';
import {
  FAVORITE,
  UPVOTE,
  DOWNVOTE,
} from '../constants/ActionTypes';
import { initState } from './auth';
import { currentUserSelector } from './users';

export interface VoteStats {
  upvotes: string[];
  downvotes: string[];
  favorites: string[];
}

const initialState: VoteStats = {
  upvotes: [],
  downvotes: [],
  favorites: [],
};

export default function reduce(state = initialState, action: AnyAction): VoteStats {
  const { type, payload } = action;
  switch (type) {
    case initState.fulfilled.type:
      return payload.booth?.stats ?? initialState;
    case 'booth/advance':
      return initialState;
    case UPVOTE:
      if (state.upvotes.includes(payload.userID)) {
        return state;
      }
      return {
        ...state,
        upvotes: [...state.upvotes, payload.userID],
        downvotes: state.downvotes.filter((vote) => vote !== payload.userID),
      };
    case DOWNVOTE:
      if (state.downvotes.includes(payload.userID)) {
        return state;
      }
      return {
        ...state,
        upvotes: state.upvotes.filter((vote) => vote !== payload.userID),
        downvotes: [...state.downvotes, payload.userID],
      };
    case FAVORITE:
      if (state.favorites.includes(payload.userID)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, payload.userID],
      };
    default:
      return state;
  }
}

function createIsSelector(votersSelector: (state: StoreState) => string[]) {
  return (state: StoreState) => {
    const voters = votersSelector(state);
    const user = currentUserSelector(state);
    return user != null && voters.includes(user._id);
  };
}

export const favoritesSelector = (state: StoreState) => state.votes.favorites;
export const upvotesSelector = (state: StoreState) => state.votes.upvotes;
export const downvotesSelector = (state: StoreState) => state.votes.downvotes;

export const isFavoriteSelector = createIsSelector(favoritesSelector);
export const isUpvoteSelector = createIsSelector(upvotesSelector);
export const isDownvoteSelector = createIsSelector(downvotesSelector);

export const favoritesCountSelector = (state: StoreState) => state.votes.favorites.length;
export const upvotesCountSelector = (state: StoreState) => state.votes.upvotes.length;
export const downvotesCountSelector = (state: StoreState) => state.votes.downvotes.length;

export const currentVotesSelector = createStructuredSelector({
  favorites: favoritesSelector,
  upvotes: upvotesSelector,
  downvotes: downvotesSelector,
});

export const currentVoteStatsSelector = createStructuredSelector({
  isFavorite: isFavoriteSelector,
  isUpvote: isUpvoteSelector,
  isDownvote: isDownvoteSelector,
  favoritesCount: favoritesCountSelector,
  upvotesCount: upvotesCountSelector,
  downvotesCount: downvotesCountSelector,
});
