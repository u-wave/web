import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from './containers/App';
import configureStore from './store/configureStore';
import { initState, socketConnect, setJWT } from './actions/LoginActionCreators';
import * as api from './api';

export default class Uwave {
  options = {};
  sources = {};
  jwt = null;

  constructor(options = {}, session = null) {
    this.options = options;
    this.jwt = session;

    Object.assign(this, api.constants);
    Object.assign(this, api.components);
    Object.assign(this, api.actions);
  }

  use(plugin) {
    plugin(this);
    return this;
  }

  source(sourceType, sourcePlugin, opts = {}) {
    const sourceFactory = sourcePlugin.default || sourcePlugin;

    const type = typeof sourceFactory;
    if (type !== 'function' && type !== 'object') {
      throw new TypeError(`Source plugin should be a function, got ${type}`);
    }

    const source = type === 'function'
      ? sourceFactory(this, opts)
      : sourceFactory;

    this.sources[sourceType] = source;

    return source;
  }

  build() {
    this.store = configureStore(
      { config: this.options },
      { mediaSources: this.sources }
    );

    if (this.jwt) {
      this.store.dispatch(setJWT(this.jwt));
      this.jwt = null;
    }

    this.store.dispatch(socketConnect());
    this.store.dispatch(initState());
  }

  getComponent() {
    return (
      <Provider store={this.store}>
        <AppContainer mediaSources={this.sources} />
      </Provider>
    );
  }

  renderToDOM(target) {
    if (!this.store) {
      this.build();
    }

    ReactDOM.render(this.getComponent(), target);
  }
}
