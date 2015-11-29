import 'es6-promise';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as Socket from './utils/Socket';
import { init as restoreSession } from './utils/Session';
import { initState } from './actions/LoginActionCreators';

// Material-UI dependency
require('react-tap-event-plugin')();

ReactDOM.render(<App />, document.getElementById('app'));

restoreSession();
initState();

// temporary debug and testing things
Socket.connect();

window.debug = require('debug');
