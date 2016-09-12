import {
  SET_SEARCH_SOURCE,
  SHOW_SEARCH_RESULTS,
  SEARCH_START,
  SEARCH_COMPLETE
} from '../constants/actionTypes/search';
import { get } from './RequestActionCreators';

export function setSource(source) {
  return {
    type: SET_SEARCH_SOURCE,
    payload: { source }
  };
}

export function showSearchResults() {
  return { type: SHOW_SEARCH_RESULTS };
}

function searchStart(query) {
  return {
    type: SEARCH_START,
    payload: { query }
  };
}

export function search(query) {
  return get('/search', {
    qs: { query },
    onStart: () => (dispatch) => {
      dispatch(searchStart(query));
      dispatch(showSearchResults());
    },
    onComplete: results => ({
      type: SEARCH_COMPLETE,
      payload: { results }
    }),
    onError: error => ({
      type: SEARCH_COMPLETE,
      error: true,
      payload: error
    })
  });
}
