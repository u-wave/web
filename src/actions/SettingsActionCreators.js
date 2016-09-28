import {
  LOAD_SETTINGS,
  CHANGE_SETTING
} from '../constants/actionTypes/settings';

export function loadSettings(obj) {
  return {
    type: LOAD_SETTINGS,
    payload: obj
  };
}

export function set(name, value) {
  return {
    type: CHANGE_SETTING,
    payload: { [name]: value }
  };
}

export function setLanguage(lang) {
  return set('language', lang);
}
