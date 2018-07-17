import ms from 'ms';
import splitargs from 'splitargs';
import parseChatMarkup from 'u-wave-parse-chat-markup';
import flashDocumentTitle from 'flash-document-title';
import playMentionSound from '../utils/playMentionSound';
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
  UNMUTE_USER,
} from '../constants/ActionTypes';
import { put } from './RequestActionCreators';
import { execute } from '../utils/ChatCommands';
import {
  muteTimeoutsSelector,
  mutedUserIDsSelector,
  currentUserMuteSelector,
} from '../selectors/chatSelectors';
import { settingsSelector } from '../selectors/settingSelectors';
import {
  currentUserSelector,
  userListSelector,
  userHasRoleSelector,
  currentUserHasRoleSelector,
} from '../selectors/userSelectors';
import { currentTimeSelector } from '../selectors/timeSelectors';
import {
  getAvailableGroupMentions,
  resolveMentions,
  hasMention,
} from '../utils/chatMentions';

export function receiveMotd(text) {
  return {
    type: RECEIVE_MOTD,
    payload: text,
  };
}

let logIdx = Date.now();
export function log(text) {
  logIdx += 1;
  return {
    type: LOG,
    payload: {
      _id: logIdx,
      text,
    },
  };
}

export function prepareMessage(state, user, text, parseOpts = {}) {
  const parsed = parseChatMarkup(text, parseOpts);
  resolveMentions(parsed, state);
  return {
    type: SEND_MESSAGE,
    payload: {
      user,
      message: text,
      parsed,
    },
  };
}

export function sendChat(text) {
  return (dispatch, getState) => {
    const state = getState();
    const sender = currentUserSelector(state);
    const hasRole = currentUserHasRoleSelector(state);
    const mute = currentUserMuteSelector(state);
    if (mute) {
      const timeLeft = ms(mute.expiresAt - Date.now(), { long: true });
      dispatch(log(`You have been muted, and cannot chat for another ${timeLeft}.`));
      return;
    }

    const users = userListSelector(state);
    const message = prepareMessage(state, sender, text, {
      mentions: [
        ...users.map(user => user.username),
        ...getAvailableGroupMentions(hasRole),
      ],
    });
    dispatch(message);
  };
}

export function inputMessage(text) {
  return (dispatch, getState) => {
    if (text[0] === '/') {
      const [command, ...params] = splitargs(text.slice(1));
      if (command) {
        const result = execute(getState(), command, params);
        if (result) {
          dispatch(result);
        }
        return;
      }
    }
    dispatch(sendChat(text));
  };
}

function isMuted(state, userID) {
  return mutedUserIDsSelector(state).includes(userID);
}

export function receive(message) {
  return (dispatch, getState) => {
    const state = getState();
    const settings = settingsSelector(state);
    const currentUser = currentUserSelector(state);
    const users = userListSelector(state);
    const sender = users.find(user => user._id === message.userID);
    const senderHasRole = userHasRoleSelector(state)(sender);
    const mentions = [
      ...users.map(user => user.username),
      ...getAvailableGroupMentions(mention => senderHasRole(`chat.mention.${mention}`)),
    ];

    if (isMuted(state, message.userID)) {
      return;
    }

    const parsed = parseChatMarkup(message.text, { mentions });
    resolveMentions(parsed, state);

    const isMention = currentUser ? hasMention(parsed, currentUser._id) : false;

    dispatch({
      type: RECEIVE_MESSAGE,
      payload: {
        message: {
          ...message,
          user: sender,
        },
        isMention,
        parsed,
      },
    });

    if (isMention) {
      if (settings.mentionSound) {
        playMentionSound();
      }
      flashDocumentTitle(`💬 ${sender.username}`);
    }
  };
}

export function removeMessage(id) {
  return {
    type: REMOVE_MESSAGE,
    payload: { _id: id },
  };
}

export function removeMessagesByUser(userID) {
  return {
    type: REMOVE_USER_MESSAGES,
    payload: { userID },
  };
}

export function removeAllMessages() {
  return {
    type: REMOVE_ALL_MESSAGES,
  };
}

function expireMute(userID) {
  return {
    type: UNMUTE_USER,
    payload: { userID },
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
        expirationTimer: expireIn > 0
          ? setTimeout(() => dispatch(expireMute(userID)), expireIn) : null,
      },
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
      payload: { userID, moderatorID },
    });
  };
}

export function setMotdStart(motd) {
  return {
    type: SET_MOTD_START,
    payload: motd,
  };
}

export function setMotdComplete(motd) {
  return {
    type: SET_MOTD_COMPLETE,
    payload: motd,
  };
}

export function setMotd(text) {
  return put('/motd', { motd: text }, {
    onStart: () => setMotdStart(text),
    onComplete: ({ data }) => (dispatch) => {
      dispatch(setMotdComplete(data.motd));
      dispatch(log(`Message of the Day is now: ${data.motd}`));
    },
    onError: error => ({
      type: SET_MOTD_COMPLETE,
      error: true,
      payload: error,
    }),
  });
}
