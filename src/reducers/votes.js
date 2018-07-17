import {
  ADVANCE,
  LOAD_VOTES,
  FAVORITE,
  UPVOTE,
  DOWNVOTE,
  DO_FAVORITE_START,
  DO_FAVORITE_COMPLETE,
} from '../constants/ActionTypes';

const initialState = {
  upvotes: [],
  downvotes: [],
  favorites: [],
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case ADVANCE:
      if (payload && payload.stats) {
        return {
          ...state,
          upvotes: payload.stats.upvotes,
          downvotes: payload.stats.downvotes,
          favorites: payload.stats.favorites,
        };
      }
      return initialState;
    case LOAD_VOTES:
      return {
        ...state,
        upvotes: payload.upvotes,
        downvotes: payload.downvotes,
        favorites: payload.favorites,
      };
    case UPVOTE:
      return {
        ...state,
        upvotes: [...state.upvotes, payload.userID],
        downvotes: state.downvotes.filter(vote => vote !== payload.userID),
      };
    case DOWNVOTE:
      return {
        ...state,
        upvotes: state.upvotes.filter(vote => vote !== payload.userID),
        downvotes: [...state.downvotes, payload.userID],
      };
    case FAVORITE:
      if (!state.favorites.includes(payload.userID)) {
        return {
          ...state,
          favorites: [...state.favorites, payload.userID],
        };
      }
      return state;
    case DO_FAVORITE_START:
      return state;
    case DO_FAVORITE_COMPLETE:
      return state;
    default:
      return state;
  }
}
