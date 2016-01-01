import { LOAD, SET } from '../constants/actionTypes/settings';

export function loadSettings(obj) {
  return {
    type: LOAD,
    payload: obj
  };
}

export function set(name, value) {
  return {
    type: SET,
    payload: { [name]: value }
  };
}
