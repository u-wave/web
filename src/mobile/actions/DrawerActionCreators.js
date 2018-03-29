import {
  SET_DRAWER_OPEN,
  SET_USERS_DRAWER_OPEN,
  TOGGLE_DRAWER_OPEN,
} from '../constants/ActionTypes';

export function setDrawer(val) {
  return { type: SET_DRAWER_OPEN, payload: val };
}

export function openDrawer() {
  return setDrawer(true);
}

export function closeDrawer() {
  return setDrawer(false);
}

export function toggleDrawer() {
  return { type: TOGGLE_DRAWER_OPEN };
}

export function setUsersDrawer(val) {
  return { type: SET_USERS_DRAWER_OPEN, payload: val };
}

export function openUsersDrawer() {
  return setUsersDrawer(true);
}
