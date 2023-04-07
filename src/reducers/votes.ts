import { AnyAction } from 'redux';
import {
  INIT_STATE,
  LOAD_VOTES,
  FAVORITE,
  UPVOTE,
  DOWNVOTE,
} from '../constants/ActionTypes';
import { advance } from './booth';

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
    case INIT_STATE:
      return payload.booth?.stats ?? initialState;
    case advance.type:
      return initialState;
    case LOAD_VOTES:
      return payload;
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
