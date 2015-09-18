import React from 'react';
import App from './components/App';
import CurrentMediaStore from './stores/CurrentMediaStore';
import * as FakeChatSocket from './utils/FakeChatSocket';
import * as FakeAdvanceSocket from './utils/FakeAdvanceSocket';

React.render(<App />, document.body);

// temporary debug and testing things

CurrentMediaStore.init();
FakeChatSocket.connect();
FakeAdvanceSocket.connect();

window.debug = require('debug');
