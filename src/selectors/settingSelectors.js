import { createSelector } from 'reselect';
import ThemeManager from 'material-ui/lib/styles/theme-manager';

export const settingsSelector = state => state.settings;

export const themeSelector = state => state.theme;

export const muiThemeSelector = createSelector(
  themeSelector,
  theme => ThemeManager.getMuiTheme(theme)
);

export const volumeSelector = createSelector(
  settingsSelector,
  settings => settings.volume
);

export const isMutedSelector = createSelector(
  settingsSelector,
  settings => settings.muted
);
