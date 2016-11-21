// Polyfills for browsers that might not yet support Promises or the Fetch API
// (newer & better XMLHttpRequest).
import 'es6-promise';
import 'whatwg-fetch';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from './containers/App';
import { get as readSession } from './utils/Session';
import configureStore from './store/configureStore';
import { initState, socketConnect, setJWT } from './actions/LoginActionCreators';
import * as api from './api';

// Register default chat commands.
import './utils/commands';

// A Material-UI dependency, removes the delay from tap events on some mobile
// devices. üWave currently isn't compatible with mobile yet, but material-ui
// wants this!
require('react-tap-event-plugin')();

export default class Uwave {
  options = {};
  sources = {};
  jwt = null;
  renderTarget = null;
  aboutPageComponent = null;

  constructor(options = {}, session = readSession()) {
    this.options = options;
    this.jwt = session;

    Object.assign(this, api.constants);
    Object.assign(this, api.components);
    Object.assign(this, api.actions);

    if (module.hot) {
      const HotContainer = require('react-hot-loader').AppContainer;
      this._getComponent = this.getComponent;
      this.getComponent = () => (
        <HotContainer>{this._getComponent()}</HotContainer>
      );
      module.hot.accept('./containers/App', () => {
        if (this.renderTarget) {
          this.renderToDOM(this.renderTarget);
        }
      });
    }
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

  setAboutPageComponent(AboutPageComponent) {
    this.aboutPageComponent = AboutPageComponent;
  }
  getAboutPageComponent() {
    return this.aboutPageComponent;
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
        <AppContainer
          mediaSources={this.sources}
          uwave={this}
        />
      </Provider>
    );
  }

  renderToDOM(target) {
    if (!this.store) {
      this.build();
    }

    this.renderTarget = target;
    ReactDOM.render(this.getComponent(), target);
  }
}
