import { RESET_THEME, APPLY_THEME } from '../constants/ActionTypes';

export function debugResetTheme() {
  return { type: RESET_THEME };
}

export function debugApplyTheme(newValues) {
  return { type: APPLY_THEME, payload: newValues };
}
