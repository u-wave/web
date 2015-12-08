import { get } from '../utils/Request';

export function setSource(source) {
  return {
    type: 'setSearchSource',
    payload: {
      source: source
    }
  };
}

export function search(query) {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;

    dispatch({
      type: 'searchStart',
      payload: { query }
    });
    get(jwt, '/v1/search', { query })
      .then(res => res.json())
      .then(results => {
        dispatch({
          type: 'searchComplete',
          payload: { results }
        });
      });
  };
}
