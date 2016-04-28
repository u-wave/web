import assign from 'object-assign';
import createApis from './api';
import * as selectors from './selectors';

function bindSelectors(s, getState) {
  const bound = {};
  Object.keys(s).forEach(name => {
    bound[name] = () => s[name](getState());
  });
  return bound;
}

class Extension {
  constructor(store, name) {
    this.store = store;
    this.name = name;
    this.id = Symbol(`extension: ${name}`);

    assign(this, createApis(store));
    assign(this, bindSelectors(selectors, store.getState));
  }

  dispatch(action) {
    return this.store.dispatch(action);
  }
}

export default function extension(store, name, definition = ext => ext) {
  if (typeof name !== 'string') {
    throw new TypeError(
      'uw.extension(): You have to give your extension a name. Expected a string ' +
      `as the first parameter, got "${typeof name}".`
    );
  }
  const ext = new Extension(store, name);
  definition(ext);
  return ext;
}
