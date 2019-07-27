import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer as HotContainer } from 'react-hot-loader';
import { StylesProvider } from '@material-ui/styles';
import AppContainer from './containers/App';
import { get as readSession } from './utils/Session';
import createGenerateClassName from './utils/createGenerateClassName';
import configureStore from './store/configureStore';
import { initState, socketConnect, setSessionToken } from './actions/LoginActionCreators';
import { loadCurrentLanguage } from './actions/LocaleActionCreators';
import * as api from './api';
// Register default chat commands.
import './utils/commands';

export default class Uwave {
  options = {};

  sources = {};

  sessionToken = null;

  renderTarget = null;

  aboutPageComponent = null;

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

    if (this.sessionToken) {
      this.store.dispatch(setSessionToken(this.sessionToken));
      this.sessionToken = null;
    }

    this.store.dispatch(socketConnect());
    return Promise.all([
      this.store.dispatch(loadCurrentLanguage()),
      this.store.dispatch(initState()),
    ]).then(() => {
      this.resolveReady();
    });
  }

  getComponent() {
    return (
      <Provider store={this.store}>
        <StylesProvider injectFirst generateClassName={this.generateClassName}>
          <AppContainer
            mediaSources={this.sources}
            uwave={this}
          />
        </StylesProvider>
      </Provider>
    );
  }

  renderToDOM(target) {
    if (!this.store) {
      this.build();
    }
    if (!this.renderTarget) {
      this.renderTarget = ReactDOM.unstable_createRoot(target);
    }

    const element = (
      <React.StrictMode>
        {this.getComponent()}
      </React.StrictMode>
    );
    this.renderTarget.render(element);
  }
}
