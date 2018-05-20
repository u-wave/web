import setPath from 'lodash/set';
import {
  LOAD_SETTINGS,
  CHANGE_SETTING,
} from '../constants/ActionTypes';

export function loadSettings(obj) {
  return {
    type: LOAD_SETTINGS,
    payload: obj,
  };
}

export function set(name, value) {
  const changeset = {};
  setPath(changeset, name, value);
  return {
    type: CHANGE_SETTING,
    payload: changeset,
  };
}

export function setLanguage(lang) {
  return set('language', lang);
}
