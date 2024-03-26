import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import ms from 'ms';
import parseChatMarkup from 'u-wave-parse-chat-markup';
import flashDocumentTitle from 'flash-document-title';
import playMentionSound from '../utils/playMentionSound';
import { currentUserSelector } from '../reducers/auth';
import {
  getAvailableGroupMentions,
  resolveMentions,
  hasMention,
} from '../utils/chatMentions';
import { mutedUserSelector } from '../reducers/chat';
import * as actions from '../reducers/chat';
import { mentionSoundEnabledSelector } from '../reducers/settings';
import type { StoreState } from '../redux/configureStore';
import {
  type User,
  userListSelector,
  userHasRoleSelector,
} from '../reducers/users';

type Thunk = ThunkAction<unknown, StoreState, never, AnyAction>;

export function prepareMessage(state: StoreState, user: User, text: string, parseOpts = {}) {
  const parsed = parseChatMarkup(text, parseOpts);
  resolveMentions(parsed, state);
  return actions.sendMessage({
    user,
    message: text,
    parsed,
  });
}

function mentionsForSender(state: StoreState, sender: User) {
  const users = userListSelector(state);
  return [
    ...users.map((user) => user.username),
    ...getAvailableGroupMentions((mention) => userHasRoleSelector(state, sender, `chat.mention.${mention}`)),
  ];
}

export function sendChat(text: string): Thunk {
  return (dispatch, getState) => {
    const state = getState();
    const sender = currentUserSelector(state);
    const mute = sender != null ? mutedUserSelector(state, sender._id) : null;
    if (mute != null) {
      const timeLeft = ms(mute.expiresAt - Date.now(), { long: true });
      dispatch(actions.log(`You have been muted, and cannot chat for another ${timeLeft}.`));
      return;
    }

    // Shouldn't really happen
    if (!sender) {
      return;
    }

    const message = prepareMessage(state, sender, text, {
      mentions: mentionsForSender(state, sender),
    });
    dispatch(message);
  };
}

export function receive(message: {
  _id: string,
  userID: string,
  text: string,
  timestamp: number,
}): Thunk {
  return (dispatch, getState) => {
    const state = getState();
    const mentionSoundEnabled = mentionSoundEnabledSelector(state);
    const currentUser = currentUserSelector(state);
    const users = userListSelector(state);
    const sender = users.find((user) => user._id === message.userID);
    if (!sender) {
      // TODO we should find the user somehow?
      return;
    }

    if (mutedUserSelector(state, message.userID) != null) {
      return;
    }

    const parsed = parseChatMarkup(message.text, {
      mentions: mentionsForSender(state, sender),
    });
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
      if (mentionSoundEnabled) {
        playMentionSound();
      }
      flashDocumentTitle(`💬 ${sender.username}`);
    }
  };
}
