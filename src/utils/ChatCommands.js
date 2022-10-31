// Helper to consistently find online users in command handlers.
export function findUser(users, username) {
  const lname = username.toLowerCase();
  return users.find((o) => o.username.toLowerCase() === lname);
}

export default class ChatCommands {
  #store;

  #commands;

  constructor(store, commandList) {
    this.#store = store;
    this.#commands = Object.fromEntries(commandList.map(({ name, ...command }) => [name, command]));
  }

  canExecute({ guard = undefined } = {}) {
    return guard ? guard(this.#store.getState()) : true;
  }

  execute(name, args = []) {
    if (this.#commands[name]) {
      const allowed = this.canExecute(this.#commands[name]);
      if (allowed) {
        return this.#commands[name].action(this, ...args);
      }
    }
    return null;
  }

  getCommands() {
    return this.#commands;
  }
}
