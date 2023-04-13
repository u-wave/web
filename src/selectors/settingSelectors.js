import { createSelector } from 'reselect';
import createTheme from '../utils/createTheme';

/** @param {import('../redux/configureStore').StoreState} state */
const settingsBaseSelector = (state) => state.settings;

export const themeSelector = createSelector(
  /** @param {import('../redux/configureStore').StoreState} state */
  (state) => state.theme,
  (base) => createTheme(base),
);

export const notificationSettingsSelector = createSelector(
  settingsBaseSelector,
  (settings) => settings.notifications,
);
