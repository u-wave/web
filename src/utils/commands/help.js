import { getCommands, canExecute } from '../ChatCommands';
import { log } from '../../actions/ChatActionCreators';

export default [{
  name: 'help',
  description: 'List available commands.',
  action: () => (dispatch, getState) => {
    const available = getCommands();
    dispatch(log('Available commands:'));
    Object.keys(available).sort().forEach((name) => {
      const command = available[name];
      if (canExecute(getState(), command)) {
        dispatch(log(`/${name} - ${command.description}`));
      }
    });
  },
}];
