import { RECEIVE_MESSAGE, SEND_MESSAGE, LOG } from '../constants/actionTypes/chat';

const MAX_MESSAGES = 500;

const initialState = {
  /**
   * All messages, including log messages and in-flight messages.
   */
  messages: []
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
  case SEND_MESSAGE:
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
  case RECEIVE_MESSAGE:
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
  case LOG:
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
  default:
    return state;
  }
}
