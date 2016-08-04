import escapeRegExp from 'escape-string-regexp';
import ms from 'ms';
import splitargs from 'splitargs';
import parseChatMarkup from 'u-wave-parse-chat-markup';

import {
  RECEIVE_MOTD,
  SET_MOTD_START,
  SET_MOTD_COMPLETE,

  SEND_MESSAGE,
  RECEIVE_MESSAGE,

  LOG,

  REMOVE_MESSAGE,
  REMOVE_USER_MESSAGES,
  REMOVE_ALL_MESSAGES,

  MUTE_USER,
  UNMUTE_USER
} from '../constants/actionTypes/chat';
import { sendMessage } from '../utils/Socket';
import { put } from './RequestActionCreators';
import { execute } from '../utils/ChatCommands';
import {
  muteTimeoutsSelector,
  mutedUserIDsSelector,
  currentUserMuteSelector
} from '../selectors/chatSelectors';
import { settingsSelector } from '../selectors/settingSelectors';
import {
  currentUserSelector,
  userListSelector
} from '../selectors/userSelectors';
import { currentTimeSelector } from '../selectors/timeSelectors';

export function receiveMotd(text) {
  return {
    type: RECEIVE_MOTD,
    payload: parseChatMarkup(text, {})
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

/**
 * Attach user objects to mentions in a parsed chat message.
 *
 * @param {Array} tree Parsed message.
 * @param {Array.<{username: string}>} users List of users.
 */
function resolveMentions(tree, users) {
  tree.forEach(node => {
    if (node.type === 'mention') {
      /* eslint-disable no-param-reassign */
      node.user = users.find(user => user.username.toLowerCase() === node.mention);
      /* eslint-enable no-param-reassign */
    } else if (node.content) {
      resolveMentions(node.content, users);
    }
  });
}

export function prepareMessage(user, text, parseOpts = {}) {
  const parsed = parseChatMarkup(text, parseOpts);
  resolveMentions(parsed, parseOpts.users);
  return {
    type: SEND_MESSAGE,
    payload: {
      user,
      message: text,
      parsed
    }
  };
}

export function sendChat(from, text) {
  return (dispatch, getState) => {
    const mute = currentUserMuteSelector(getState());
    if (mute) {
      const timeLeft = ms(mute.expiresAt - Date.now(), { long: true });
      dispatch(log(
        `You have been muted, and cannot chat for another ${timeLeft}.`
      ));
      return;
    }

    const users = userListSelector(getState());
    const mentions = users.map(user => user.username);
    const message = prepareMessage(from, text, { mentions, users });
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
if (typeof window !== 'undefined' && window.Audio) {
  mentionSound = new window.Audio('assets/audio/mention.mp3');
}
function playMentionSound() {
  if (mentionSound) {
    mentionSound.play();
  }
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
    const currentUser = currentUserSelector(getState());
    const users = userListSelector(getState());
    const mentions = users.map(user => user.username);

    if (isMuted(getState(), message.userID)) {
      return;
    }

    const isMention = currentUser
      ? hasMention(message.text, currentUser.username)
      : false;

    const parsed = parseChatMarkup(message.text, { mentions });
    resolveMentions(parsed, users);

    dispatch({
      type: RECEIVE_MESSAGE,
      payload: {
        message: {
          ...message,
          user: users.find(user => user._id === message.userID)
        },
        isMention,
        parsed
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
        userID,
        moderatorID,
        expiresAt,
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

export function setMotdStart(motd) {
  return {
    type: SET_MOTD_START,
    payload: motd
  };
}

export function setMotdComplete(motd) {
  return {
    type: SET_MOTD_COMPLETE,
    payload: motd
  };
}

export function setMotd(text) {
  return put('/motd', { motd: text }, {
    onStart: () => setMotdStart(text),
    onComplete: ({ motd }) => dispatch => {
      dispatch(setMotdComplete(motd));
      dispatch(log(`Message of the Day is now: ${motd}`));
    },
    onError: error => ({
      type: SET_MOTD_COMPLETE,
      error: true,
      payload: error
    })
  });
}
