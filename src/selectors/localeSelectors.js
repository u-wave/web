import { createSelector } from 'reselect';
import Translator from '@u-wave/translate';
import * as plurals from '@u-wave/translate/plurals';
import { availableLanguages } from '../locales';
import { languageSelector as currentLanguageSelector } from './settingSelectors';

const defaultLanguageSelector = () => 'en';
const baseSelector = state => state.locales;
const loadedSelector = createSelector(baseSelector, base => base.loaded);

const defaultTranslatorSelector = createSelector(
  loadedSelector,
  defaultLanguageSelector,
  (loaded, lang) => new Translator(loaded[lang].uwave),
);

export const availableLanguagesSelector = () => availableLanguages;

export const loadingSelector = createSelector(
  baseSelector,
  base => new Set(base.loading),
);

export const translatorSelector = createSelector(
  loadedSelector,
  currentLanguageSelector,
  defaultTranslatorSelector,
  (langs, current, defaultTranslator) => {
    if (langs[current]) {
      return new Translator(langs[current].uwave, {
        plural: plurals[current],
        default: defaultTranslator,
      });
    }
    return defaultTranslator;
  },
);

export const loadedLanguagesSelector = createSelector(
  loadedSelector,
  loaded => new Set(Object.keys(loaded)),
);

const relativeTimeFormatOptions = {
  numeric: 'auto',
  style: 'long',
};
const supportsRelativeTimeFormat = (() => {
  try {
    const formatter = new Intl.RelativeTimeFormat('nl', relativeTimeFormatOptions);
    return formatter.format(-2, 'days') === 'eergisteren'
      && formatter.format(10, 'seconds') === 'over 10 seconden';
  } catch {
    return false;
  }
})();
export const relativeTimeFormatterSelector = createSelector(
  currentLanguageSelector,
  (current) => {
    if (supportsRelativeTimeFormat) {
      return new Intl.RelativeTimeFormat(current, relativeTimeFormatOptions);
    }
    return null;
  },
);

const timeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
};
const dateFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export const timeFormatterSelector = createSelector(
  currentLanguageSelector,
  current => new Intl.DateTimeFormat(current, timeFormatOptions),
);

export const dateFormatterSelector = createSelector(
  currentLanguageSelector,
  current => new Intl.DateTimeFormat(current, dateFormatOptions),
);

export const dateTimeFormatterSelector = createSelector(
  currentLanguageSelector,
  current => new Intl.DateTimeFormat(current, {
    ...dateFormatOptions,
    ...timeFormatOptions,
  }),
);
