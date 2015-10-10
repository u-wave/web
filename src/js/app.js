import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import CurrentMediaStore from './stores/CurrentMediaStore';
import * as Socket from './utils/Socket';
import { restore as restoreSession } from './utils/Auth';

ReactDOM.render(<App />, document.getElementById('app'));

if ('_session' in localStorage) {
  restoreSession(localStorage._session);
}

// temporary debug and testing things
CurrentMediaStore.init();
Socket.connect();

window.debug = require('debug');
