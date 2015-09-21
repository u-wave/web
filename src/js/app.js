import React from 'react';
import App from './components/App';
import CurrentMediaStore from './stores/CurrentMediaStore';
import * as Socket from './utils/Socket';
import * as FakePlaylists from './utils/FakePlaylists';

React.render(<App />, document.body);

// temporary debug and testing things

FakePlaylists.init();
CurrentMediaStore.init();
Socket.connect();

window.debug = require('debug');
