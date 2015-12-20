import isEqual from 'is-equal-shallow';

const SETTINGS_KEY = 'uwaveSettings';

const attempt = fn => {
  try {
    return fn() || undefined;
  } catch (e) {
    return undefined;
  }
};

const persistSettings = next => (reducer, initialState) => {
  const settings = attempt(() =>
    JSON.parse(localStorage.getItem(SETTINGS_KEY))
  );

  const store = next(reducer, { ...initialState, settings });

  let prevSettings = settings;
  store.subscribe(() => {
    const newSettings = store.getState().settings;
    if (!isEqual(prevSettings, newSettings)) {
      attempt(() =>
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings))
      );
    }
    prevSettings = newSettings;
  });
  return store;
};

export default persistSettings;
