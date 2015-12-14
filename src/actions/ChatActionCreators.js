import escapeRegExp from 'escape-string-regexp';
import values from 'object-values';

import { SEND_MESSAGE, RECEIVE_MESSAGE } from '../constants/actionTypes/chat';
import parseChatMarkup from '../utils/parseChatMarkup';
import { sendMessage } from '../utils/Socket';

const debug = require('debug')('uwave:actions:chat');

export function prepareMessage(user, text, parseOpts = {}) {
  return {
    type: SEND_MESSAGE,
    payload: {
      user,
      message: text,
      parsed: parseChatMarkup(text, parseOpts)
    }
  };
}

export function sendChat(user, text) {
  return (dispatch, getState) => {
    const users = values(getState().users);
    const message = prepareMessage(user, text, { users });
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
    const users = values(getState().users);
    const isMention = user ? hasMention(message.text, user.username) : false;
    dispatch({
      type: RECEIVE_MESSAGE,
      payload: {
        message,
        isMention,
        parsed: parseChatMarkup(message.text, { users })
      }
    });
    if (isMention) {
      playMentionSound();
    }
  };
}
