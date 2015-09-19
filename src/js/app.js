import React from 'react';
import App from './components/App';
import CurrentMediaStore from './stores/CurrentMediaStore';
import * as FakeChatSocket from './utils/FakeChatSocket';
import * as FakeAdvanceSocket from './utils/FakeAdvanceSocket';
import * as FakePlaylists from './utils/FakePlaylists';

React.render(<App />, document.body);

// temporary debug and testing things

FakePlaylists.init();
CurrentMediaStore.init();
FakeChatSocket.connect();
FakeAdvanceSocket.connect();

window.debug = require('debug');
