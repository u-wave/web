import { dispatch } from '../dispatcher';

export function setSource(source) {
  dispatch({
    action: 'setSearchSource',
    source: source
  });
}
