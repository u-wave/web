import omit from 'just-omit';
import {
  INIT_STATE,
  RECEIVE_MOTD,
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
  LOG,
  REMOVE_MESSAGE,
  REMOVE_USER_MESSAGES,
  REMOVE_ALL_MESSAGES,
  MUTE_USER,
  UNMUTE_USER,
} from '../constants/ActionTypes';
import reduceNotifications from './chat/notifications';

const initialState = {
  /**
   * Message of the Day, a message shown at the very top of the Chat box. Can be
   * used for announcements, for example, or a welcome message.
   */
  motd: null,
  /**
   * All messages, including log messages and in-flight messages.
   */
  messages: [],
  /**
   * Mutes and their expiration times.
   */
  mutedUsers: {},
};

function removeInFlightMessage(messages, remove) {
  return messages.filter((message) => {
    if (!message.inFlight) {
      return true;
    }
    if (message.userID !== remove.userID) {
      return true;
    }

    // Compare messages by user-generated ID if possible, else fall back to contents
    if (remove.tags?.id) {
      return message._id !== remove.tags?.id;
    }
    return message.text !== remove.text;
  });
}

export default function reduce(state = initialState, action = undefined) {
  const { type, payload } = action;
  const { messages } = state;
  switch (type) {
    case INIT_STATE:
      return {
        ...state,
        motd: payload.motd,
      };
    case RECEIVE_MOTD:
      return {
        ...state,
        motd: payload,
      };
    case SEND_MESSAGE: {
      const inFlightMessage = {
        _id: payload._id,
        type: 'chat',
        user: payload.user,
        userID: payload.user._id,
        text: payload.message,
        parsedText: payload.parsed,
        timestamp: Date.now(),
        inFlight: true,
        // Will be resolved when the message is received instead.
        isMention: false,
      };
      return {
        ...state,
        messages: messages.concat([inFlightMessage]),
      };
    }
    case RECEIVE_MESSAGE: {
      const message = {
        ...payload.message,
        type: 'chat',
        inFlight: false,
        parsedText: payload.parsed,
        isMention: payload.isMention,
      };

      return {
        ...state,
        messages: removeInFlightMessage(messages, message).concat([message]),
      };
    }
    case LOG: {
      const logMessage = {
        type: 'log',
        _id: payload._id,
        text: payload.text,
      };
      return {
        ...state,
        messages: messages.concat([logMessage]),
      };
    }

    case REMOVE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter((msg) => msg._id !== payload._id),
      };
    case REMOVE_USER_MESSAGES:
      return {
        ...state,
        messages: state.messages.filter((msg) => msg.userID !== payload.userID),
      };
    case REMOVE_ALL_MESSAGES:
      return {
        ...state,
        messages: [],
      };

    case MUTE_USER:
      return {
        ...state,
        mutedUsers: {
          ...state.mutedUsers,
          [payload.userID]: {
            mutedBy: payload.moderatorID,
            expiresAt: payload.expiresAt,
            expirationTimer: payload.expirationTimer,
          },
        },
      };
    case UNMUTE_USER:
      return {
        ...state,
        mutedUsers: omit(state.mutedUsers, payload.userID),
      };

    default: {
      const nextMessages = reduceNotifications(messages, action);
      if (nextMessages !== messages) {
        return { ...state, messages: nextMessages };
      }
      return state;
    }
  }
}
