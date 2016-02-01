const debug = require('debug')('uwave:chat-commands');

const commands = {};

export function getCommands() {
  return commands;
}

export function register(name, description, action) {
  commands[name] = { description, action };
}

export function execute(name, args = []) {
  debug('execute', name, args);
  if (commands[name]) {
    return commands[name].action(...args);
  }
}

// TODO move default commands to some other file!
import { log } from '../actions/ChatActionCreators';

register('help', 'List available commands.', () =>
  dispatch => {
    const available = getCommands();
    dispatch(log('Available commands:'));
    Object.keys(available).forEach(name => {
      const { description } = available[name];
      dispatch(log(`/${name} - ${description}`));
    });
  }
);
