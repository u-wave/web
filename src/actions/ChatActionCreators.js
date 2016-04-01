import escapeRegExp from 'escape-string-regexp';
import values from 'object-values';
import ms from 'ms';
import splitargs from 'splitargs';
import parseChatMarkup from 'u-wave-parse-chat-markup';

import {
  SEND_MESSAGE, RECEIVE_MESSAGE, LOG,
  REMOVE_MESSAGE, REMOVE_USER_MESSAGES, REMOVE_ALL_MESSAGES,
  MUTE_USER, UNMUTE_USER
} from '../constants/actionTypes/chat';
import { sendMessage } from '../utils/Socket';
import { execute } from '../utils/ChatCommands';
import {
  muteTimeoutsSelector,
  mutedUserIDsSelector,
  currentUserMuteSelector
} from '../selectors/chatSelectors';
import { settingsSelector } from '../selectors/settingSelectors';
import { currentUserSelector, usersSelector, userListSelector } from '../selectors/userSelectors';
import { currentTimeSelector } from '../selectors/timeSelectors';

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
    const mute = currentUserMuteSelector(getState());
    if (mute) {
      const timeLeft = ms(mute.expiresAt - Date.now(), { long: true });
      return dispatch(log(
        `You have been muted, and cannot chat for another ${timeLeft}.`
      ));
    }

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
  const rx = new RegExp(`@${escapeRegExp(username)}\\b`, 'i');
  return rx.test(text);
}

function isMuted(state, userID) {
  return mutedUserIDsSelector(state).indexOf(userID) !== -1;
}

export function receive(message) {
  return (dispatch, getState) => {
    const settings = settingsSelector(getState());
    const user = currentUserSelector(getState());
    const users = usersSelector(getState());

    if (isMuted(getState(), message.userID)) {
      return;
    }

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

function expireMute(userID) {
  return {
    type: UNMUTE_USER,
    payload: { userID }
  };
}

export function muteUser(userID, { moderatorID, expiresAt }) {
  return (dispatch, getState) => {
    const currentTime = currentTimeSelector(getState());
    const expireIn = expiresAt - currentTime;

    dispatch({
      type: MUTE_USER,
      payload: {
        userID, moderatorID, expiresAt,
        expirationTimer: expireIn > 0 ?
          setTimeout(() => dispatch(expireMute(userID)), expireIn) : null
      }
    });
  };
}

export function unmuteUser(userID, { moderatorID }) {
  return (dispatch, getState) => {
    const muteTimeouts = muteTimeoutsSelector(getState());
    if (muteTimeouts && muteTimeouts[userID]) {
      clearTimeout(muteTimeouts[userID]);
    }
    dispatch({
      type: UNMUTE_USER,
      payload: { userID, moderatorID }
    });
  };
}
