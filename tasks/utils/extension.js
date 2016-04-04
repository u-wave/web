import baseTheme from '../../src/MuiTheme';
import merge from 'lodash/merge';

const theme = baseTheme;

export function applyTheme(newTheme) {
  return merge(theme, newTheme);
}

export function getTheme() {
  return theme;
}
