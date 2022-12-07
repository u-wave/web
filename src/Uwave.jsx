import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import AppContainer from './containers/App';
import { get as readSession } from './utils/Session';
import configureStore from './redux/configureStore';
import { initState, socketConnect, setSessionToken } from './actions/LoginActionCreators';
import { loadCurrentLanguage } from './actions/LocaleActionCreators';

/**
 * @typedef {object} UwaveOptions
 * @prop {string} [apiBase]
 * @prop {string} [socketUrl]
 */

export default class Uwave {
  /** @type {UwaveOptions} */
  options = {};

  #sources = {};

  #sessionToken = null;

  #renderTarget = null;

  #aboutPageComponent = null;

  #emotionCache = createCache({
    key: 'emc',
    prepend: true,
  });

  #resolveReady;

  ready = new Promise((resolve) => {
    this.#resolveReady = resolve;
  });

  /**
   * @param {UwaveOptions} [options]
   */
  constructor(options = {}, session = readSession()) {
    this.options = options;
    this.#sessionToken = session;
  }

  use(plugin) {
    plugin(this);
    return this;
  }

  source(sourcePlugin, opts = {}) {
    const sourceFactory = sourcePlugin.default ?? sourcePlugin;

    const type = typeof sourceFactory;
    if (type !== 'function' && type !== 'object') {
      throw new TypeError(`Source plugin should be a function, got ${type}`);
    }

    const source = type === 'function'
      ? sourceFactory(this, opts)
      : sourceFactory;

    if (typeof source.name !== 'string') {
      throw new TypeError('Source plugin did not provide a name');
    }

    this.#sources[source.name] = source;

    return source;
  }

  setAboutPageComponent(AboutPageComponent) {
    this.#aboutPageComponent = AboutPageComponent;
  }

  getAboutPageComponent() {
    return this.#aboutPageComponent;
  }

  async build() {
    this.store = configureStore(
      { config: this.options },
      { mediaSources: this.#sources, socketUrl: this.options.socketUrl },
    );

    if (this.#sessionToken) {
      this.store.dispatch(setSessionToken(this.#sessionToken));
      this.#sessionToken = null;
    }

    this.store.dispatch(socketConnect());
    await Promise.all([
      this.store.dispatch(loadCurrentLanguage()),
      this.store.dispatch(initState()),
    ]);
    this.#resolveReady();
  }

  /** @private */
  getComponent() {
    return (
      <Provider store={this.store}>
        <StyledEngineProvider injectFirst>
          <CacheProvider value={this.#emotionCache}>
            <AppContainer
              mediaSources={this.#sources}
              uwave={this}
            />
          </CacheProvider>
        </StyledEngineProvider>
      </Provider>
    );
  }

  renderToDOM(target) {
    if (!this.store) {
      this.build();
    }
    if (!this.#renderTarget) {
      this.#renderTarget = target;
    }

    const root = createRoot(this.#renderTarget);

    root.render((
      <React.StrictMode>
        {this.getComponent()}
      </React.StrictMode>
    ));
  }
}
