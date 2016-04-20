import except from 'except';

import {
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
  LOG,
  REMOVE_MESSAGE,
  REMOVE_USER_MESSAGES,
  REMOVE_ALL_MESSAGES,
  MUTE_USER,
  UNMUTE_USER
} from '../constants/actionTypes/chat';

const MAX_MESSAGES = 500;

const initialState = {
  /**
   * All messages, including log messages and in-flight messages.
   */
  messages: [],
  /**
   * Mutes and their expiration times.
   */
  mutedUsers: {}
};

function removeInFlightMessage(messages, remove) {
  return messages.filter(message => (
    // keep if this message is not in flight
    !message.inFlight ||
    // or is not the message we're looking for
    message.userID !== remove.userID ||
    message.text !== remove.text
  ));
}

function limit(messages, n) {
  return messages.length > n ? messages.slice(1) : messages;
}

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  const { messages } = state;
  switch (type) {
  case SEND_MESSAGE: {
    const inFlightMessage = {
      _id: `inflight${Date.now()}`,
      type: 'chat',
      user: payload.user,
      userID: payload.user._id,
      text: payload.message,
      parsedText: payload.parsed,
      timestamp: Date.now(),
      inFlight: true
    };
    return {
      ...state,
      messages: limit(messages.concat([ inFlightMessage ]), MAX_MESSAGES)
    };
  }
  case RECEIVE_MESSAGE: {
    const message = {
      ...payload.message,
      type: 'chat',
      inFlight: false,
      parsedText: payload.parsed,
      isMention: payload.isMention
    };

    return {
      ...state,
      messages: limit(
        removeInFlightMessage(messages, message).concat([ message ]),
        MAX_MESSAGES
      )
    };
  }
  case LOG: {
    const logMessage = {
      type: 'log',
      _id: `log-${payload._id}`,
      text: payload.text
    };
    return {
      ...state,
      messages: limit(
        messages.concat([ logMessage ]), MAX_MESSAGES
      )
    };
  }

  case REMOVE_MESSAGE:
    return {
      ...state,
      messages: state.messages.filter(msg => msg._id !== payload._id)
    };
  case REMOVE_USER_MESSAGES:
    return {
      ...state,
      messages: state.messages.filter(msg => msg.userID !== payload.userID)
    };
  case REMOVE_ALL_MESSAGES:
    return {
      ...state,
      messages: []
    };

  case MUTE_USER:
    return {
      ...state,
      mutedUsers: {
        ...state.mutedUsers,
        [payload.userID]: {
          mutedBy: payload.moderatorID,
          expiresAt: payload.expiresAt,
          expirationTimer: payload.expirationTimer
        }
      }
    };
  case UNMUTE_USER:
    return {
      ...state,
      mutedUsers: except(state.mutedUsers, payload.userID)
    };

  default:
    return state;
  }
}
