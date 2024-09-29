import type { Action, Store } from 'redux';
import type { User } from '../reducers/users';
import type { StoreState } from '../redux/configureStore';
import type { Thunk } from '../redux/api';

/** Helper to consistently find online users in command handlers. */
export function findUser(users: User[], username: string) {
  const lname = username.toLowerCase();
  return users.find((o) => o.username.toLowerCase() === lname);
}

export interface Command {
  name: string,
  description?: string,
  guard?: (state: StoreState) => boolean,
  // eslint-disable-next-line no-use-before-define
  action: (commander: ChatCommands, ...args: string[]) => Action | Thunk<unknown>,
}

type CommandInternal = Omit<Command, 'name'>;

export default class ChatCommands {
  #store;

  #commands: Record<string, CommandInternal | undefined>;

  constructor(store: Store<StoreState>, commandList: Command[]) {
    this.#store = store;
    this.#commands = Object.fromEntries(commandList.map(({ name, ...command }) => [name, command]));
  }

  canExecute({ guard }: CommandInternal) {
    return guard ? guard(this.#store.getState()) : true;
  }

  execute(name: string, args: string[] = []) {
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
