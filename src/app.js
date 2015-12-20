import 'es6-promise';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppContainer from './components/App/Container';
import * as Socket from './utils/Socket';
import { get as readSession } from './utils/Session';
import { initState, setJWT } from './actions/LoginActionCreators';
import { startTicking } from './actions/TickerActionCreators';

import configureStore from './store/configureStore';

const store = configureStore();

const jwt = readSession();
if (jwt) {
  store.dispatch(setJWT(jwt));
}

store.dispatch(initState());
store.dispatch(startTicking());

Socket.connect(store);

// Material-UI dependency
require('react-tap-event-plugin')();

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);

window.debug = require('debug');
