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
  case 'searchStart':
    return {
      ...state,
      query: payload.query,
      results: {},
      loadingState: LOADING
    };
  case 'searchComplete':
    return {
      ...state,
      results: payload.results,
      loadingState: LOADED
    };
  case 'setSearchSource':
    return {
      ...state,
      sourceType: payload.source
    };
  default:
    return state;
  }
}
