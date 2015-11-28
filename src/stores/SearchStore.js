import { IDLE, LOADING, LOADED } from '../constants/LoadingStates';
import Store from './Store';

const initialState = {
  sourceType: 'youtube',
  query: null,
  results: {},
  loadingState: IDLE
};

function reduce(state = initialState, action = {}) {
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

class SearchStore extends Store {
  reduce(state, action) {
    return reduce(state, action);
  }

  getSourceType() {
    return this.state.sourceType;
  }
  getQuery() {
    return this.state.query;
  }
  getLoadingState() {
    return this.state.loadingState;
  }
  getResults() {
    return this.state.results[this.state.sourceType] || [];
  }
  getAllResults() {
    return this.state.results;
  }
}

export default new SearchStore;
