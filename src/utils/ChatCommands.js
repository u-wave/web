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
