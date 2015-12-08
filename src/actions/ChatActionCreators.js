import escapeRegExp from 'escape-string-regexp';
import { sendMessage } from '../utils/Socket';

const debug = require('debug')('uwave:actions:chat');

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

function playMentionSound() {
  // TODO
  debug('mention sound here');
}

function hasMention(text, username) {
  const rx = new RegExp(`@${escapeRegExp(username)}\\b`);
  return rx.test(text);
}

export function receive(message) {
  return (dispatch, getState) => {
    const user = getState().auth.user;
    const isMention = user ? hasMention(message.text, user.username) : false;
    dispatch({
      type: 'chatReceive',
      payload: { message, isMention }
    });
    if (isMention) {
      playMentionSound();
    }
  };
}
