import Store from './Store';
import LoginStore from './LoginStore';
import UserStore from './UserStore';
import escapeRegExp from 'escape-string-regexp';

const MAX_MESSAGES = 500;

const initialState = [];

function removeInFlightMessage(messages, remove) {
  return messages.filter(message => (
    // keep if this message is not in flight
    !message.inFlight ||
    // or is not the message we're looking for
    message.userID !== remove.userID ||
    message.text !== remove.text
  ));
}

function hasMention(message, username) {
  const rx = new RegExp(`@${escapeRegExp(username)}\\b`);
  return rx.test(message);
}

function limit(state, n) {
  return state.length > n ? state.slice(1) : state;
}

function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  const user = LoginStore.getUser();
  switch (type) {
  case 'chatSend':
    const inFlightMessage = {
      _id: `inflight${Date.now()}`,
      user: user,
      userID: user._id,
      text: payload.message,
      timestamp: Date.now(),
      inFlight: true
    };
    return limit(state.concat([ inFlightMessage ]), MAX_MESSAGES);
  case 'chatReceive':
    const message = {
      ...payload.message,
      inFlight: false,
      user: UserStore.getUser(payload.message.userID)
    };

    if (user) {
      message.isMention = hasMention(message.text, user.username);
    }

    return limit(
      removeInFlightMessage(state, message).concat([ message ]),
      MAX_MESSAGES
    );
  default:
    return state;
  }
}

class ChatStore extends Store {
  reduce(state, action) {
    return reduce(state, action);
  }

  getMessages() {
    return this.state;
  }
}

export default new ChatStore;
