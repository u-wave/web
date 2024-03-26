import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import AppContainer from './containers/App';
import { get as readSession } from './utils/Session';
import configureStore from './redux/configureStore';
import { socketConnect } from './actions/LoginActionCreators';
import { loadCurrentLanguage } from './actions/LocaleActionCreators';
import type { MediaSource } from './context/MediaSourceContext';
import { initState, setSessionToken } from './reducers/auth';

interface UwaveOptions {
  apiUrl?: string;
  socketUrl?: string;
  emoji?: Record<string, string>;
}

export default class Uwave {
  options: UwaveOptions = {};

  #sources: Record<string, MediaSource<Record<string, unknown>>> = {};

  #sessionToken: string | null = null;

  #renderTarget: Element | null = null;

  #aboutPageComponent: React.ComponentType | null = null;

  #emotionCache = createCache({
    key: 'emc',
    prepend: true,
  });

  #resolveReady: null | (() => void) = null;

  store?: ReturnType<typeof configureStore>;

  ready = new Promise<void>((resolve) => {
    this.#resolveReady = resolve;
  });

  constructor(options: UwaveOptions = {}, session = readSession()) {
    this.options = options;
    this.#sessionToken = session;
  }

  use(plugin: (uw: this) => void) {
    plugin(this);
    return this;
  }

  source(sourcePlugin: MediaSource | ((uw: this, opts: object) => MediaSource), opts = {}) {
    if (typeof sourcePlugin !== 'function' && typeof sourcePlugin !== 'object') {
      throw new TypeError(`Source plugin should be a function, got ${typeof sourcePlugin}`);
    }

    const source = typeof sourcePlugin === 'function'
      ? sourcePlugin(this, opts)
      : sourcePlugin;

    if (typeof source.name !== 'string') {
      throw new TypeError('Source plugin did not provide a name');
    }

    this.#sources[source.name] = source;

    return source;
  }

  setAboutPageComponent(AboutPageComponent: React.ComponentType) {
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
    const [initResult] = await Promise.all([
      this.store.dispatch(initState()),
      this.store.dispatch(loadCurrentLanguage()),
    ]);
    this.#resolveReady?.();
    if ('error' in initResult) {
      throw Object.assign(new Error(initResult.error.message), initResult.error);
    }
  }

  private getComponent() {
    if (!this.store) {
      throw new Error('Uwave not initialized');
    }

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

  renderToDOM(target: Element) {
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
