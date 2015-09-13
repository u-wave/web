import React from 'react';
import { advance } from './actions/AdvanceActionCreators';
import App from './components/App';
import dispatcher from './dispatcher';
import * as FakeChatSocket from './utils/FakeChatSocket';

React.render(<App />, document.body);

// temporary debug and testing things

FakeChatSocket.connect();

window.dispatcher = dispatcher;

advance({
  source: 'youtube',
  id: 'eYaaZUlnX18',
  artist: 'D-UNIT',
  title: 'LUV ME',
  duration: 3 * 60 + 15
});
