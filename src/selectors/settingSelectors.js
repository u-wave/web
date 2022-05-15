import { createSelector } from 'reselect';
import { availableLanguages } from '../locales';
import createTheme from '../utils/createTheme';

const availableLanguagesSelector = () => availableLanguages;

function getAvailableLanguage(available, languages) {
  return languages.find((lang) => (
    available.includes(lang)
  ));
}

const defaultLanguageSelector = createSelector(
  availableLanguagesSelector,
  (available) => {
    if (typeof window === 'object' && window.navigator && window.navigator.languages) {
      const browserLanguage = getAvailableLanguage(available, window.navigator.languages);
      if (browserLanguage) {
        return browserLanguage;
      }
    }
    return 'en';
  },
);

const settingsBaseSelector = (state) => state.settings;

export const themeSelector = createSelector(
  (state) => state.theme,
  (base) => createTheme(base),
);

export const volumeSelector = createSelector(
  settingsBaseSelector,
  (settings) => settings.volume,
);

export const isMutedSelector = createSelector(
  settingsBaseSelector,
  (settings) => settings.muted,
);

export const isMutedThisSelector = createSelector(
  settingsBaseSelector,
  (settings) => settings.mutedThis,
);

export const languageSelector = createSelector(
  settingsBaseSelector,
  defaultLanguageSelector,
  (settings, defaultLanguage) => settings.language ?? defaultLanguage,
);

export const videoSizeSelector = createSelector(
  settingsBaseSelector,
  (settings) => settings.videoSize,
);

export const videoEnabledSelector = createSelector(
  settingsBaseSelector,
  (settings) => settings.videoEnabled,
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
  (settings) => settings.notifications,
);
