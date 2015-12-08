import { sendMessage } from '../utils/Socket';

export function prepareMessage(user, text) {
  return {
    type: 'chatSend',
    payload: {
      user,
      message: text
    }
  };
}

export function sendChat(user, text) {
  return dispatch => {
    const message = prepareMessage(user, text);
    dispatch(message);
    sendMessage(message);
  };
}

export function receive(message) {
  return {
    type: 'chatReceive',
    payload: { message }
  };
}
