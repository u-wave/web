const MAX_MESSAGES = 500;

const initialState = {
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
  case 'chatSend':
    const inFlightMessage = {
      _id: `inflight${Date.now()}`,
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
  case 'chatReceive':
    const message = {
      ...payload.message,
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
  default:
    return state;
  }
}
