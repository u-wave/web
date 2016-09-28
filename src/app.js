// Polyfills for browsers that might not yet support Promises or the Fetch API
// (newer & better XMLHttpRequest).
import 'es6-promise';
import 'whatwg-fetch';
import Uwave from './Uwave';

import { get as readSession } from './utils/Session';

import * as youTubeSource from './sources/youtube';
import * as soundCloudSource from './sources/soundcloud';

// Register default chat commands.
import './utils/commands';

function readApplicationConfig() {
  try {
    return JSON.parse(document.getElementById('u-wave-config').textContent);
  } catch (e) {
    return {};
  }
}

const uw = new Uwave(
  readApplicationConfig(),
  // Check if we have a previous login session going.
  readSession()
);

// Configure the Media sources to be used by this üWave client instance.
uw.source('youtube', youTubeSource);
uw.source('soundcloud', soundCloudSource);

// A Material-UI dependency, removes the delay from tap events on some mobile
// devices. üWave currently isn't compatible with mobile yet, but material-ui
// wants this!
require('react-tap-event-plugin')();

// This exposes a global `debug.enable()` function that you can call to get some
// extra debug output.
// Usually you'll want to do `debug.enable('uwave:*')` and then refresh the
// page.
window.debug = require('debug');

window.uw = uw;
