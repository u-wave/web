import 'es6-promise';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

import AppContainer from './components/App/Container';
import * as Socket from './utils/Socket';
import { init as restoreSession } from './utils/Session';
import { initState } from './actions/LoginActionCreators';

import * as reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(logger())(createStore);
const store = createStoreWithMiddleware(
  combineReducers(reducers)
);

// Material-UI dependency
require('react-tap-event-plugin')();

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);

restoreSession();
initState();

// temporary debug and testing things
Socket.connect(store.dispatch);

window.debug = require('debug');
