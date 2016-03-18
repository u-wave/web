import { LOAD, SET, APPLY_THEME } from '../constants/actionTypes/settings';

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

export function applyTheme(theme) {
  return {
    type: APPLY_THEME,
    payload: theme
  };
}
