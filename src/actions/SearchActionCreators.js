import { dispatch } from '../dispatcher';
import { get } from '../utils/Request';
// FIXME temporary hack to get the current session token w/o access to redux store
import { get as jwt } from '../utils/Session';

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
  return get(jwt(), '/v1/search', { query })
    .then(res => res.json())
    .then(results => {
      dispatch({
        type: 'searchComplete',
        payload: { results }
      });
    });
}
