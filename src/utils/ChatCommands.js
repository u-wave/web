import commandList from './commands';

const commands = Object.fromEntries(commandList.map(({ name, ...command }) => [name, command]));

export function getCommands() {
  return commands;
}

export function canExecute(state, { guard = undefined } = {}) {
  return guard ? guard(state) : true;
}

export function execute(state, name, args = []) {
  if (commands[name]) {
    const allowed = canExecute(state, commands[name]);
    if (allowed) {
      return commands[name].action(...args);
    }
  }
  return null;
}

// Helper to consistently find online users in command handlers.
export function findUser(users, username) {
  const lname = username.toLowerCase();
  return users.find((o) => o.username.toLowerCase() === lname);
}
