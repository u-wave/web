import escapeRegExp from 'escape-string-regexp';
import values from 'object-values';
import splitargs from 'splitargs';

import {
  SEND_MESSAGE, RECEIVE_MESSAGE, LOG,
  REMOVE_MESSAGE, REMOVE_USER_MESSAGES, REMOVE_ALL_MESSAGES
} from '../constants/actionTypes/chat';
import parseChatMarkup from '../utils/parseChatMarkup';
import { sendMessage } from '../utils/Socket';
import { execute } from '../utils/ChatCommands';
import { settingsSelector } from '../selectors/settingSelectors';
import { currentUserSelector, usersSelector, userListSelector } from '../selectors/userSelectors';

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
    const users = userListSelector(getState());
    const message = prepareMessage(user, text, { users });
    dispatch(message);
    sendMessage(message);
  };
}

export function inputMessage(text) {
  return (dispatch, getState) => {
    if (text[0] === '/') {
      const [ command, ...params ] = splitargs(text.slice(1));
      if (command) {
        const result = execute(getState(), command, params);
        if (result) {
          dispatch(result);
        }
        return;
      }
    }
    const user = currentUserSelector(getState());
    dispatch(sendChat(user, text));
  };
}

let mentionSound;
function playMentionSound() {
  if (!mentionSound) {
    mentionSound = new Audio('assets/audio/mention.mp3');
  }
  mentionSound.play();
}

function hasMention(text, username) {
  const rx = new RegExp(`@${escapeRegExp(username)}\\b`);
  return rx.test(text);
}

export function receive(message) {
  return (dispatch, getState) => {
    const settings = settingsSelector(getState());
    const user = currentUserSelector(getState());
    const users = usersSelector(getState());
    const isMention = user
      ? hasMention(message.text, user.username)
      : false;

    dispatch({
      type: RECEIVE_MESSAGE,
      payload: {
        message: {
          ...message,
          user: users[message.userID]
        },
        isMention,
        parsed: parseChatMarkup(message.text, { users: values(users) })
      }
    });

    if (isMention && settings.mentionSound) {
      playMentionSound();
    }
  };
}

let logIdx = Date.now();
export function log(text) {
  return {
    type: LOG,
    payload: {
      _id: logIdx++,
      text
    }
  };
}

export function removeMessage(id) {
  return {
    type: REMOVE_MESSAGE,
    payload: { _id: id }
  };
}

export function removeMessagesByUser(userID) {
  return {
    type: REMOVE_USER_MESSAGES,
    payload: { userID }
  };
}

export function removeAllMessages() {
  return {
    type: REMOVE_ALL_MESSAGES
  };
}
