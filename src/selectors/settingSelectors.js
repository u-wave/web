/* global window */
import find from 'array-find';
import { createSelector } from 'reselect';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { availableLanguages } from '../locale';

function getAvailableLanguage(languages) {
  return find(languages, lang => (
    availableLanguages.indexOf(lang) !== -1
  ));
}

function getDefaultLanguage() {
  if (typeof window === 'object' && window.navigator && window.navigator.languages) {
    const browserLanguage = getAvailableLanguage(window.navigator.languages);
    if (browserLanguage) {
      return browserLanguage;
    }
  }
  return 'en';
}

const settingsBaseSelector = state => state.settings;

export const themeSelector = state => state.theme;

export const muiThemeSelector = createSelector(
  themeSelector,
  theme => getMuiTheme(theme),
);

export const volumeSelector = createSelector(
  settingsBaseSelector,
  settings => settings.volume,
);

export const isMutedSelector = createSelector(
  settingsBaseSelector,
  settings => settings.muted,
);

export const languageSelector = createSelector(
  settingsBaseSelector,
  getDefaultLanguage,
  (settings, defaultLanguage) => settings.language || defaultLanguage,
);

export const videoSizeSelector = createSelector(
  settingsBaseSelector,
  settings => settings.videoSize,
);

export const videoEnabledSelector = createSelector(
  settingsBaseSelector,
  settings => settings.videoEnabled,
);

// Settings with selected values (from selectors above) rather than "saved"
// values (from localStorage).
export const settingsSelector = createSelector(
  settingsBaseSelector,
  volumeSelector,
  isMutedSelector,
  videoSizeSelector,
  languageSelector,
  (base, volume, muted, videoSize, language) => ({
    ...base,
    volume,
    muted,
    videoSize,
    language,
  }),
);

export const notificationSettingsSelector = createSelector(
  settingsSelector,
  settings => settings.notifications,
);
