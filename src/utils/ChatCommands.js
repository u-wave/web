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
import { log } from '../actions/ChatActionCreators';
import { skipCurrentDJ } from '../actions/ModerationActionCreators';
import { currentUserSelector } from '../selectors/userSelectors';

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
