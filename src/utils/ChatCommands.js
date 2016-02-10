const debug = require('debug')('uwave:chat-commands');

const commands = {};

export function getCommands() {
  return commands;
}

export function register(name, description, { action, guard }) {
  commands[name] = { description, action, guard };
}

export function canExecute(state, { guard } = {}) {
  return guard ? guard(state) : true;
}

export function execute(state, name, args = []) {
  debug('execute', name, args);
  if (commands[name]) {
    const allowed = canExecute(state, commands[name]);
    debug('canExecute', allowed);
    if (allowed) {
      return commands[name].action(...args);
    }
  }
}

// TODO move default commands to some other file!
import find from 'array-find';
import { log } from '../actions/ChatActionCreators';
import {
  skipCurrentDJ,
  deleteChatMessagesByUser, deleteAllChatMessages
} from '../actions/ModerationActionCreators';
import { currentUserSelector, userListSelector } from '../selectors/userSelectors';

register('help', 'List available commands.', {
  action: () => (dispatch, getState) => {
    const available = getCommands();
    dispatch(log('Available commands:'));
    Object.keys(available).forEach(name => {
      const command = available[name];
      if (canExecute(getState(), command)) {
        dispatch(log(`/${name} - ${command.description}`));
      }
    });
  }
});

const ROLE_MODERATOR = 3;
register('skip', 'Skip the current DJ.', {
  guard: state => currentUserSelector(state).role >= ROLE_MODERATOR,
  action: (...args) => skipCurrentDJ(args ? args.join(' ') : '[No reason given]')
});

register('clearchat',
  'Delete all chat messages. ' +
  'Pass a username ("/clearchat kool_panda") to only delete messages by that user.',
  {
    guard: state => currentUserSelector(state).role >= ROLE_MODERATOR,
    action: (...args) => (dispatch, getState) => {
      const username = args.join(' ').trim();
      if (username) {
        const users = userListSelector(getState());
        const lname = username.toLowerCase();
        const user = find(users, o => o.username.toLowerCase() === lname);
        if (user) {
          return dispatch(deleteChatMessagesByUser(user._id));
        }
        return dispatch(log(`User ${username} is not online right now.`));
      }
      return dispatch(deleteAllChatMessages());
    }
  }
);
