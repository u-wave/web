import escapeRegExp from 'escape-string-regexp';
import values from 'object-values';
import audio from 'play-audio';

import { SEND_MESSAGE, RECEIVE_MESSAGE } from '../constants/actionTypes/chat';
import parseChatMarkup from '../utils/parseChatMarkup';
import { sendMessage } from '../utils/Socket';

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

let mentionSound;
function playMentionSound() {
  if (!mentionSound) {
    mentionSound = audio(['assets/audio/mention.opus', 'assets/audio/mention.mp3']);
  }
  mentionSound.play();
}

function hasMention(text, username) {
  const rx = new RegExp(`@${escapeRegExp(username)}\\b`);
  return rx.test(text);
}

export function receive(message) {
  return (dispatch, getState) => {
    const { auth, settings, users } = getState();
    const isMention = auth.user
      ? hasMention(message.text, auth.user.username)
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
