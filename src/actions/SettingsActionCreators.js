import { SET } from '../constants/actionTypes/settings';

export function set(name, value) {
  return {
    type: SET,
    payload: { [name]: value }
  };
}
