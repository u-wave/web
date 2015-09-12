import React from 'react';
import { advance } from './actions/AdvanceActionCreators';
import App from './components/App';
import dispatcher from './dispatcher';

React.render(<App />, document.body);

window.dispatcher = dispatcher;

advance({
  source: 'youtube',
  id: 'eYaaZUlnX18',
  artist: 'D-UNIT',
  title: 'LUV ME',
  duration: 3 * 60 + 15
});
