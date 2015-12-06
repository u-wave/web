import 'es6-promise';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import AppContainer from './components/App/Container';
import * as Socket from './utils/Socket';
import { get as readSession } from './utils/Session';
import { initState, setJWT } from './actions/LoginActionCreators';

import * as reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  logger()
)(createStore);
const store = createStoreWithMiddleware(
  combineReducers(reducers)
);

const jwt = readSession();
if (jwt) {
  store.dispatch(setJWT(jwt));
}

// Material-UI dependency
require('react-tap-event-plugin')();

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);

store.dispatch(initState());

// temporary debug and testing things
Socket.connect(store.dispatch);

window.debug = require('debug');
