import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import CurrentMediaStore from './stores/CurrentMediaStore';
import * as Socket from './utils/Socket';
import * as FakePlaylists from './utils/FakePlaylists';

ReactDOM.render(<App />, document.getElementById('app'));

// temporary debug and testing things

FakePlaylists.init();
CurrentMediaStore.init();
Socket.connect();

window.debug = require('debug');
