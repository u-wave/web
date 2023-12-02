import { AnyAction } from 'redux';
import {
  FAVORITE,
  UPVOTE,
  DOWNVOTE,
} from '../constants/ActionTypes';
import { advance } from './booth';
import { initState } from './auth';

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
    case advance.type:
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
