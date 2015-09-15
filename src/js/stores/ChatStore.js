import assign from 'object-assign';
import EventEmitter from 'events';
import dispatcher from '../dispatcher';

const MAX_MESSAGES = 500;
let messages = [];

const ChatStore = assign(new EventEmitter, {
  getMessages() {
    return messages;
  },

  dispatchToken: dispatcher.register(payload => {
    switch (payload.action) {
    case 'chatReceive':
      messages = messages.concat([ payload.message ]);
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
