import { dispatch } from '../dispatcher';

export function sendChat(user, text) {
  dispatch({
    type: 'chatSend',
    payload: {
      user,
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
