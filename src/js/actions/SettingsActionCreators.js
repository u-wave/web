import { dispatch } from '../dispatcher';

export function set(name, value) {
  dispatch({
    type: 'setSettings',
    payload: { [name]: value }
  });
}
