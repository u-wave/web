import {
  CHANGE_LANGUAGE,
  LOAD_LANGUAGE_START,
  LOAD_LANGUAGE_COMPLETE,
} from '../constants/ActionTypes';
import { loadedLanguagesSelector } from '../reducers/locales';
import { languageSelector as currentLanguageSelector } from '../reducers/settings';
import { resources } from '../locales';
import type { Thunk } from '../redux/api';

const inFlight: Record<string, undefined | Promise<void>> = {};

function setLanguage(language: string) {
  return {
    type: CHANGE_LANGUAGE,
    payload: language,
  };
}

function loadLanguage(language: string): Thunk<Promise<void>> {
  return async (dispatch) => {
    if (!Object.hasOwn(resources, language) || typeof resources[language] !== 'function') {
      return;
    }

    dispatch({
      type: LOAD_LANGUAGE_START,
      payload: language,
    });

    inFlight[language] = resources[language]().then((data) => {
      dispatch({
        type: LOAD_LANGUAGE_COMPLETE,
        payload: data,
        meta: { language },
      });
      delete inFlight[language];
    });

    await inFlight[language];
  };
}

export function loadCurrentLanguage(): Thunk<Promise<void>> {
  return async (dispatch, getState) => {
    const loadedLanguages = loadedLanguagesSelector(getState());
    const currentLanguage = currentLanguageSelector(getState());
    if (loadedLanguages.has(currentLanguage)) {
      return;
    }

    await dispatch(loadLanguage(currentLanguage));
  };
}

export function changeLanguage(language: string): Thunk<Promise<void>> {
  return async (dispatch, getState) => {
    const loadedLanguages = loadedLanguagesSelector(getState());
    if (!loadedLanguages.has(language)) {
      await dispatch(loadLanguage(language));
    }
    dispatch(setLanguage(language));
  };
}
