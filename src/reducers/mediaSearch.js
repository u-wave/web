import {
  SET_SEARCH_SOURCE, SEARCH_START, SEARCH_COMPLETE
} from '../constants/actionTypes/search';
import { IDLE, LOADING, LOADED } from '../constants/LoadingStates';

const initialState = {
  sourceType: 'youtube',
  query: null,
  results: {},
  loadingState: IDLE
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case SEARCH_START:
    return {
      ...state,
      query: payload.query,
      results: {},
      loadingState: LOADING
    };
  case SEARCH_COMPLETE:
    return {
      ...state,
      results: payload.results,
      loadingState: LOADED
    };
  case SET_SEARCH_SOURCE:
    return {
      ...state,
      sourceType: payload.source
    };
  default:
    return state;
  }
}
