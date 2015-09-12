import React from 'react';
import App from './components/App';
import dispatcher from './dispatcher';

React.render(<App />, document.body);

window.dispatcher = dispatcher;

setTimeout(() => {
  dispatcher.dispatch({
    action: 'advance',
    video: { source: 'youtube', id: 'i__969noyAM' }
  });
}, 100);
