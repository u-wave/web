import { createSelector } from 'reselect';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const settingsSelector = state => state.settings;

export const themeSelector = state => state.theme;

export const muiThemeSelector = createSelector(
  themeSelector,
  theme => getMuiTheme(theme)
);

export const volumeSelector = createSelector(
  settingsSelector,
  settings => settings.volume
);

export const isMutedSelector = createSelector(
  settingsSelector,
  settings => settings.muted
);

export const languageSelector = createSelector(
  settingsSelector,
  settings => settings.language
);
