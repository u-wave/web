import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import AppContainer from './containers/App';
import { get as readSession } from './utils/Session';
import configureStore from './redux/configureStore';
import { initState, socketConnect, setSessionToken } from './actions/LoginActionCreators';
import { loadCurrentLanguage } from './actions/LocaleActionCreators';
// Register default chat commands.
import './utils/commands';

export default class Uwave {
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

  constructor(options = {}, session = readSession()) {
    this.options = options;
    this.#sessionToken = session;

    if (module.hot) {
      const uw = this;
      module.hot.accept('./containers/App', () => {
        if (uw.#renderTarget) {
          uw.renderToDOM();
        }
      });
    }
  }

  use(plugin) {
    plugin(this);
    return this;
  }

  source(sourcePlugin, opts = {}) {
    const sourceFactory = sourcePlugin.default || sourcePlugin;

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

  build() {
    this.store = configureStore(
      { config: this.options },
      { mediaSources: this.#sources, socketUrl: this.options.socketUrl },
    );

    if (this.#sessionToken) {
      this.store.dispatch(setSessionToken(this.#sessionToken));
      this.#sessionToken = null;
    }

    this.store.dispatch(socketConnect());
    return Promise.all([
      this.store.dispatch(loadCurrentLanguage()),
      this.store.dispatch(initState()),
    ]).then(() => {
      this.#resolveReady();
    });
  }

  #getComponent() {
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

    const element = (
      <React.StrictMode>
        {this.#getComponent()}
      </React.StrictMode>
    );

    return new Promise((resolve) => {
      ReactDOM.render(element, this.#renderTarget, resolve);
    });
  }
}
