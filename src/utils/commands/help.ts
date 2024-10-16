import { log } from '../../reducers/chat';
import type { Command } from '../ChatCommands';

export default [{
  name: 'help',
  description: 'List available commands.',
  action: (commander) => (dispatch) => {
    const available = commander.getCommands();
    dispatch(log('Available commands:'));
    Object.keys(available).sort().forEach((name) => {
      const command = available[name];
      if (command != null && commander.canExecute(command)) {
        dispatch(log(`/${name} - ${command.description}`));
      }
    });
  },
}] satisfies Command[];
