import {
  SET_SEARCH_SOURCE, SEARCH_START, SEARCH_COMPLETE
} from '../constants/actionTypes/search';
import { get } from './RequestActionCreators';

export function setSource(source) {
  return {
    type: SET_SEARCH_SOURCE,
    payload: { source }
  };
}

export function search(query) {
  return get('/search', {
    qs: { query },
    onStart: () => ({
      type: SEARCH_START,
      payload: { query }
    }),
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
