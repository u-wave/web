// Polyfills for browsers that might not yet support Promises or the Fetch API
// (newer & better XMLHttpRequest).
import 'es6-promise';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppContainer from './containers/App';
import { get as readSession } from './utils/Session';
import { initState, socketConnect, setJWT } from './actions/LoginActionCreators';

import * as youTubeSource from './sources/youtube';
import * as soundCloudSource from './sources/soundcloud';

import configureStore from './store/configureStore';

// Register default chat commands.
import './utils/commands';

function readApplicationConfig() {
  try {
    return JSON.parse(document.getElementById('u-wave-config').textContent);
  } catch (e) {
    return {};
  }
}

// Configure the Media sources to be used by this üWave client instance.
const mediaSources = {
  youtube: youTubeSource,
  soundcloud: soundCloudSource
};

// The Store holds all of the application state. The @connect calls in the React
// Container components use this store to access state.
const store = configureStore({
  config: readApplicationConfig()
}, { mediaSources });

// Check if we have a previous login session going.
const jwt = readSession();
if (jwt) {
  store.dispatch(setJWT(jwt));
}

// Load application state like the current DJ, online users, etc.
store.dispatch(socketConnect());
store.dispatch(initState());

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
    <AppContainer mediaSources={mediaSources} />
  </Provider>,
  document.getElementById('app')
);

// We're done, so remove the loading screen.
document.getElementById('app-loading').innerHTML = '';

// This exposes a global `debug.enable()` function that you can call to get some
// extra debug output.
// Usually you'll want to do `debug.enable('uwave:*')` and then refresh the
// page.
window.debug = require('debug');
