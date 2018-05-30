/* eslint-disable import/first */
import './polyfills';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer as HotContainer } from 'react-hot-loader';
import { create as createJss } from 'jss';
import { jssPreset } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
/* eslint-enable */
import createLocale from './locale';
import AppContainer from './containers/App';
import { get as readSession } from './utils/Session';
import createGenerateClassName from './utils/createGenerateClassName';
import configureStore from './store/configureStore';
import { initState, socketConnect, setSessionToken } from './actions/LoginActionCreators';
import { languageSelector } from './selectors/settingSelectors';
import * as api from './api';
import preloadDesktop from './utils/preloadDesktop';
// Register default chat commands.
import './utils/commands';

export default class Uwave {
  options = {};
  sources = {};
  sessionToken = null;
  renderTarget = null;
  aboutPageComponent = null;

  jss = createJss(jssPreset());
  generateClassName = createGenerateClassName();

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

    this.sources[source.name] = source;

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

    if (typeof window !== 'undefined') {
      this.jss.setup({
        insertionPoint: document.querySelector('#jss'),
      });
    }

    if (typeof matchMedia !== 'undefined' && matchMedia('(min-width: 768px)').matches) {
      this.ready.then(() => {
        preloadDesktop();
      });
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
        <JssProvider jss={this.jss} generateClassName={this.generateClassName}>
          <AppContainer
            mediaSources={this.sources}
            locale={this.locale}
            uwave={this}
          />
        </JssProvider>
      </Provider>
    );
  }

  renderToDOM(target) {
    if (!this.store) {
      this.build();
    }

    this.renderTarget = target;
    const element = (
      <React.StrictMode>
        {this.getComponent()}
      </React.StrictMode>
    );
    render(element, target);
  }
}
