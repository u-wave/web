import { dispatch } from '../dispatcher';

export function sendChat(text) {
  dispatch({
    type: 'chatSend',
    payload: {
      message: text
    }
  });
}

export function receive(message) {
  return {
    type: 'chatReceive',
    payload: { message }
  };
}
