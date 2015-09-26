import assign from 'object-assign';
import EventEmitter from 'events';
import dispatcher from '../dispatcher';
import { send as sendChat } from '../utils/FakeChatSocket';
import UserStore from './UserStore';
import escapeRegExp from 'escape-string-regexp';

const MAX_MESSAGES = 500;
let messages = [];

function removeInFlightMessage(message) {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].user === message.user &&
        messages[i].inFlight &&
        messages[i].text === message.text) {
      messages.splice(i, 1);
      break;
    }
  }
}

function hasMention(message, username) {
  const rx = new RegExp(`@${escapeRegExp(username)}\\b`);
  return rx.test(message);
}

const ChatStore = assign(new EventEmitter, {
  getMessages() {
    return messages;
  },

  dispatchToken: dispatcher.register(payload => {
    const user = UserStore.getCurrentUser();
    switch (payload.action) {
    case 'chatSend':
      const send = {
        user: user,
        userID: user.id,
        text: payload.message,
        timestamp: Date.now(),
        inFlight: true
      };
      messages = messages.concat([ send ]);
      if (messages.length > MAX_MESSAGES) {
        messages = messages.slice(1);
      }

      sendChat(send);
      ChatStore.emit('change');
      break;
    case 'chatReceive':
      const message = assign({}, payload.message, {
        inFlight: false,
        user: UserStore.getUser(payload.message.userID)
      });

      message.isMention = hasMention(message.text, user.username);

      removeInFlightMessage(message);

      messages = messages.concat([ message ]);
      if (messages.length > MAX_MESSAGES) {
        messages = messages.slice(1);
      }
      ChatStore.emit('change');
      break;
    default:
      // Not for us
    }
  })
});

export default ChatStore;
