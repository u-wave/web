import isEqual from 'is-equal-shallow';
import { loadSettings } from '../actions/SettingsActionCreators';

const SETTINGS_KEY = 'uwaveSettings';

const attempt = (fn) => {
  try {
    return fn() || undefined;
  } catch (e) {
    return undefined;
  }
};

// [Store enhancer][1] that saves and loads app settings to and from
// localStorage.
//
// [1]: http://redux.js.org/docs/Glossary.html#store-enhancer
const persistSettings = next => (reducer, initialState) => {
  const settings = attempt(() => JSON.parse(localStorage.getItem(SETTINGS_KEY)));

  const store = next(reducer, initialState);

  store.dispatch(loadSettings(settings));

  let prevSettings = settings;
  store.subscribe(() => {
    const newSettings = store.getState().settings;
    if (!isEqual(prevSettings, newSettings)) {
      attempt(() => localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings)));
    }
    prevSettings = newSettings;
  });
  return store;
};

export default persistSettings;
