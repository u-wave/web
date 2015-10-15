import { dispatch } from '../dispatcher';

export function setSource(source) {
  dispatch({
    type: 'setSearchSource',
    payload: {
      source: source
    }
  });
}
