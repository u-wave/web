import assign from 'object-assign';
import EventEmitter from 'events';
import dispatcher from '../dispatcher';

const IDLE = 0;
const LOADING = 1;
const LOADED = 2;

let sourceType = 'youtube';
let query = null;
let results = {};

let loadingState = IDLE;

const SearchStore = assign(new EventEmitter, {
  IDLE, LOADING, LOADED,

  getSourceType() {
    return sourceType;
  },
  getQuery() {
    return query;
  },
  getLoadingState() {
    return loadingState;
  },
  getResults() {
    return results[sourceType] || [];
  },
  getAllResults() {
    return results;
  },

  dispatchToken: dispatcher.register(({ type, payload }) => {
    switch (type) {
    case 'searchStart':
      query = payload.query;
      results = {};
      loadingState = LOADING;
      SearchStore.emit('change');
      break;
    case 'searchComplete':
      results = payload.results;
      loadingState = LOADED;
      SearchStore.emit('change');
      break;
    case 'setSearchSource':
      sourceType = payload.source;
      SearchStore.emit('change');
      break;
    default:
      // Not for us
    }
  })
});

export default SearchStore;
