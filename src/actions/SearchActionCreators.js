import {
  SET_SEARCH_SOURCE, SEARCH_START, SEARCH_COMPLETE
} from '../constants/actionTypes/search';
import { get } from '../utils/Request';

export function setSource(source) {
  return {
    type: SET_SEARCH_SOURCE,
    payload: {
      source: source
    }
  };
}

export function search(query) {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;

    dispatch({
      type: SEARCH_START,
      payload: { query }
    });
    get(jwt, '/v1/search', { query })
      .then(res => res.json())
      .then(results => {
        dispatch({
          type: SEARCH_COMPLETE,
          payload: { results }
        });
      });
  };
}
