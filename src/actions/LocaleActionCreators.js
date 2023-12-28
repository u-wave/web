import {
  CHANGE_LANGUAGE,
  LOAD_LANGUAGE_START,
  LOAD_LANGUAGE_COMPLETE,
} from '../constants/ActionTypes';
import { loadedLanguagesSelector } from '../reducers/locales';
import { languageSelector as currentLanguageSelector } from '../reducers/settings';
import { resources } from '../locales';

const inFlight = {};

function setLanguage(language) {
  return {
    type: CHANGE_LANGUAGE,
    payload: language,
  };
}

function loadLanguage(language) {
  return (dispatch) => {
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

    return inFlight[language];
  };
}

export function loadCurrentLanguage() {
  return (dispatch, getState) => {
    const loadedLanguages = loadedLanguagesSelector(getState());
    const currentLanguage = currentLanguageSelector(getState());
    if (loadedLanguages.has(currentLanguage)) {
      return Promise.resolve();
    }

    return dispatch(loadLanguage(currentLanguage));
  };
}

export function changeLanguage(language) {
  return (dispatch, getState) => {
    const loadedLanguages = loadedLanguagesSelector(getState());
    if (loadedLanguages.has(language)) {
      return dispatch(setLanguage(language));
    }
    return dispatch(loadLanguage(language))
      .then(() => dispatch(setLanguage(language)));
  };
}
