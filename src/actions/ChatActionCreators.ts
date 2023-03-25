import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import ms from 'ms';
import parseChatMarkup from 'u-wave-parse-chat-markup';
import flashDocumentTitle from 'flash-document-title';
import { v4 as randomUUID } from 'uuid';
import playMentionSound from '../utils/playMentionSound';
import {
  RECEIVE_MOTD,
  SET_MOTD_START,
  SET_MOTD_COMPLETE,
  LOAD_EMOTES,
} from '../constants/ActionTypes';
import { get, put } from './RequestActionCreators';
import {
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
import {
  getAvailableGroupMentions,
  resolveMentions,
  hasMention,
} from '../utils/chatMentions';
import * as actions from '../reducers/chat';
import { StoreState } from '../redux/configureStore';
import { User } from '../reducers/users';

type Thunk = ThunkAction<unknown, StoreState, never, AnyAction>;

export function receiveMotd(text: string) {
  return {
    type: RECEIVE_MOTD,
    payload: text,
  };
}

export function log(text: string) {
  return actions.log({
    _id: randomUUID(),
    text,
  });
}

export function prepareMessage(state: StoreState, user: User, text: string, parseOpts = {}) {
  const parsed = parseChatMarkup(text, parseOpts);
  resolveMentions(parsed, state);
  return actions.sendMessage({
    user,
    message: text,
    parsed,
  });
}

export function sendChat(text: string): Thunk {
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
        ...users.map((user) => user.username),
        ...getAvailableGroupMentions(hasRole),
      ],
    });
    dispatch(message);
  };
}

function isMuted(state: StoreState, userID: string) {
  return mutedUserIDsSelector(state).includes(userID);
}

export function receive(message: {
  _id: string,
  userID: string,
  text: string,
  timestamp: number,
}): Thunk {
  return (dispatch, getState) => {
    const state = getState();
    const settings = settingsSelector(state);
    const currentUser = currentUserSelector(state);
    const users = userListSelector(state);
    const sender = users.find((user) => user._id === message.userID);
    if (!sender) {
      // TODO we should find the user somehow?
      return;
    }
    const senderHasRole = userHasRoleSelector(state)(sender);
    const mentions = [
      ...users.map((user) => user.username),
      ...getAvailableGroupMentions((mention) => senderHasRole(`chat.mention.${mention}`)),
    ];

    if (isMuted(state, message.userID)) {
      return;
    }

    const parsed = parseChatMarkup(message.text, { mentions });
    resolveMentions(parsed, state);

    const isMention = currentUser ? hasMention(parsed, currentUser._id) : false;

    dispatch(actions.receiveMessage({
      message: {
        ...message,
        user: sender,
      },
      isMention,
      parsed,
    }));

    if (isMention) {
      if (settings.mentionSound) {
        playMentionSound();
      }
      flashDocumentTitle(`💬 ${sender.username}`);
    }
  };
}

export function setMotdStart(motd: string) {
  return {
    type: SET_MOTD_START,
    payload: motd,
  };
}

export function setMotdComplete(motd: string) {
  return {
    type: SET_MOTD_COMPLETE,
    payload: motd,
  };
}

export function setMotd(text: string) {
  return put('/motd', { motd: text }, {
    onStart: () => setMotdStart(text),
    onComplete: ({ data }: { data: { motd: string } }): Thunk => (dispatch) => {
      dispatch(setMotdComplete(data.motd));
      dispatch(log(`Message of the Day is now: ${data.motd}`));
    },
    onError: (error) => ({
      type: SET_MOTD_COMPLETE,
      error: true,
      payload: error,
    }),
  });
}
