import dispatcher from '../dispatcher';

export function sendChat(text) {
  dispatcher.dispatch({
    action: 'chatSend',
    message: text
  });
}

export function receive(message) {
  dispatcher.dispatch({
    action: 'chatReceive',
    message: message
  });
}
