import dispatcher from '../dispatcher';

export function sendChat(text) {
  dispatcher.dispatch({
    type: 'chatSend',
    payload: {
      message: text
    }
  });
}

export function receive(message) {
  dispatcher.dispatch({
    type: 'chatReceive',
    payload: { message }
  });
}
