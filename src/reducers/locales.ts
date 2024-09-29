import type { AnyAction } from 'redux';
import { createSelector } from '@reduxjs/toolkit';
import Translator from '@u-wave/translate';
// @ts-expect-error TS7016: Untyped, not worth it as will likely move to fluent
import * as plurals from '@u-wave/translate/plurals';
import type { JsonObject, JsonValue } from 'type-fest';
import type { StoreState } from '../redux/configureStore';
import {
  CHANGE_LANGUAGE,
  LOAD_LANGUAGE_START,
  LOAD_LANGUAGE_COMPLETE,
} from '../constants/ActionTypes';
import { availableLanguages } from '../locales';
import en from '../../locale/en.yaml';
import { languageSelector as currentLanguageSelector } from './settings';

const DEFAULT_LANGUAGE = 'en';
interface State {
  current: string;
  loading: string[];
  loaded: { en: typeof en } & Record<string, JsonValue>;
}

const initialState: State = {
  current: DEFAULT_LANGUAGE,
  loading: [],
  loaded: { en },
};

export default function reduce(state = initialState, action: AnyAction): State {
  switch (action.type) {
    case LOAD_LANGUAGE_START:
      return {
        ...state,
        loading: [...state.loading, action.payload],
      };
    case LOAD_LANGUAGE_COMPLETE: {
      const { language } = action.meta;
      return {
        ...state,
        loading: state.loading.filter((l) => l !== language),
        loaded: {
          ...state.loaded,
          [language]: action.payload,
        },
      };
    }
    case CHANGE_LANGUAGE:
      return { ...state, current: action.payload };
    default:
      return state;
  }
}

const loadedSelector = (state: StoreState) => state.locales.loaded;

const defaultTranslatorSelector = createSelector(
  [loadedSelector],
  (loaded) => new Translator((loaded[DEFAULT_LANGUAGE] as { uwave: JsonObject }).uwave),
);

export const availableLanguagesSelector = () => availableLanguages;

const baseSelector = (state: StoreState) => state.locales;
export const loadingSelector = createSelector(
  [baseSelector],
  (base) => new Set(base.loading),
);

export const translatorSelector = createSelector(
  loadedSelector,
  currentLanguageSelector,
  defaultTranslatorSelector,
  (langs, current, defaultTranslator) => {
    if (langs[current]) {
      return new Translator((langs[current] as { uwave: JsonObject }).uwave, {
        plural: plurals[current],
        default: defaultTranslator,
      });
    }
    return defaultTranslator;
  },
);

export const loadedLanguagesSelector = createSelector(
  [loadedSelector],
  (loaded) => new Set(Object.keys(loaded)),
);

const RELATIVE_TIME_FORMAT_OPTIONS: Intl.RelativeTimeFormatOptions = {
  numeric: 'auto',
  style: 'long',
};
const supportsRelativeTimeFormat = (() => {
  try {
    const formatter = new Intl.RelativeTimeFormat('nl', RELATIVE_TIME_FORMAT_OPTIONS);
    return formatter.format(-2, 'days') === 'eergisteren'
      && formatter.format(10, 'seconds') === 'over 10 seconden';
  } catch {
    return false;
  }
})();
export const relativeTimeFormatterSelector = createSelector(
  [currentLanguageSelector],
  (current) => {
    if (supportsRelativeTimeFormat) {
      return new Intl.RelativeTimeFormat(current, RELATIVE_TIME_FORMAT_OPTIONS);
    }
    return null;
  },
);

const TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
};
const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export const timeFormatterSelector = createSelector(
  [currentLanguageSelector],
  (current) => new Intl.DateTimeFormat(current, TIME_FORMAT_OPTIONS),
);

export const dateFormatterSelector = createSelector(
  [currentLanguageSelector],
  (current) => new Intl.DateTimeFormat(current, DATE_FORMAT_OPTIONS),
);

export const dateTimeFormatterSelector = createSelector(
  [currentLanguageSelector],
  (current) => new Intl.DateTimeFormat(current, {
    ...DATE_FORMAT_OPTIONS,
    ...TIME_FORMAT_OPTIONS,
  }),
);
