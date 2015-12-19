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

const mentionSound = audio(['assets/audio/mention.opus', 'assets/audio/mention.mp3']);
function playMentionSound() {
  mentionSound.play();
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
    if (isMention && getState().settings.mentionSound) {
      playMentionSound();
    }
  };
}
