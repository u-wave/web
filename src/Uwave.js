// Polyfills for browsers that might not yet support Promises or the Fetch API
// (newer & better XMLHttpRequest).
import 'lie/polyfill';
import 'whatwg-fetch';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer as HotContainer } from 'react-hot-loader';
import createLocale from './locale';
import AppContainer from './containers/App';
import { get as readSession } from './utils/Session';
import configureStore from './store/configureStore';
import { initState, socketConnect, setSessionToken } from './actions/LoginActionCreators';
import { languageSelector } from './selectors/settingSelectors';
import * as api from './api';

// Register default chat commands.
import './utils/commands';

export default class Uwave {
  options = {};
  sources = {};
  sessionToken = null;
  renderTarget = null;
  aboutPageComponent = null;

  constructor(options = {}, session = readSession()) {
    this.options = options;
    this.sessionToken = session;
    this.ready = new Promise((resolve) => {
      this.resolveReady = resolve;
    });

    Object.assign(this, api.constants);
    Object.assign(this, api.components);
    Object.assign(this, api.actions);

    if (module.hot) {
      const { getComponent } = this;
      this.getComponent = () => (
        <HotContainer>{getComponent.call(this)}</HotContainer>
      );
      const uw = this;
      module.hot.accept('./containers/App', () => {
        if (uw.renderTarget) {
          uw.renderToDOM(uw.renderTarget);
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
      { mediaSources: this.sources, socketUrl: this.options.socketUrl },
    );

    const localePromise = createLocale(languageSelector(this.store.getState()));

    if (this.sessionToken) {
      this.store.dispatch(setSessionToken(this.sessionToken));
      this.sessionToken = null;
    }

    this.store.dispatch(socketConnect());
    return Promise.all([
      localePromise,
      this.store.dispatch(initState()),
    ]).then(([locale]) => {
      this.locale = locale;
      this.resolveReady();
    });
  }

  getComponent() {
    return (
      <Provider store={this.store}>
        <AppContainer
          mediaSources={this.sources}
          locale={this.locale}
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
    render(this.getComponent(), target);
  }
}
