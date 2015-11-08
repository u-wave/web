import { dispatch } from '../dispatcher';
import { get } from '../utils/Request';

export function setSource(source) {
  dispatch({
    type: 'setSearchSource',
    payload: {
      source: source
    }
  });
}

export function search(query) {
  dispatch({
    type: 'searchStart',
    payload: { query }
  });
  return get('/v1/search', { query })
    .then(res => res.json())
    .then(results => {
      dispatch({
        type: 'searchComplete',
        payload: { results }
      });
    });
}
