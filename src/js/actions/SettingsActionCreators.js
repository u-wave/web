import { dispatch } from '../dispatcher';

export function set(name, value) {
  dispatch({
    action: 'setSettings',
    settings: { [name]: value }
  });
}
