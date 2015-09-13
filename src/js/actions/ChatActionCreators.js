import dispatcher from '../dispatcher';

export function receive(message) {
  dispatcher.dispatch({
    action: 'chatReceive',
    message: message
  });
}
