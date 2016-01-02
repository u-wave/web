// Polyfills for browsers that might not yet support Promises or the Fetch API
// (newer & better XMLHttpRequest).
import 'es6-promise';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppContainer from './containers/App';
import * as Socket from './utils/Socket';
import { get as readSession } from './utils/Session';
import { initState, setJWT } from './actions/LoginActionCreators';
import { startTicking } from './actions/TickerActionCreators';

import configureStore from './store/configureStore';

// The Store holds all of the application state. The @connect calls in the React
// Container components use this store to access state.
const store = configureStore();

// Check if we have a previous login session going.
const jwt = readSession();
if (jwt) {
  store.dispatch(setJWT(jwt));
}

// Load application state like the current DJ, online users, etc.
store.dispatch(initState());

// Start the clock! üWave stores the current time in the application state
// primarily to make sure that different timers in the UI update simultaneously.
store.dispatch(startTicking());

// WebSocket connections! It uses the `store` object to dispatch actions
// received from the üWave server.
Socket.connect(store);

// A Material-UI dependency, removes the delay from tap events on some mobile
// devices. üWave currently isn't compatible with mobile yet, but material-ui
// wants this!
require('react-tap-event-plugin')();

// Render üWave! 😱
ReactDOM.render(
  // <Provider> does some magic to make all of the @connect calls in the React
  // Container components work. This is how React Components find the
  // application state that they need to render.
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);

// This exposes a global `debug.enable()` function that you can call to get some
// extra debug output.
// Usually you'll want to do `debug.enable('uwave:*')` and then refresh the
// page.
window.debug = require('debug');
