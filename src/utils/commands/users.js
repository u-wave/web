import { register } from '../ChatCommands';
import {
  log,
} from '../../actions/ChatActionCreators';
import {
  doChangeUsername,
} from '../../actions/UserActionCreators';

register(
  'nick',
  'Change your username.',
  {
    action: (name) => {
      if (name.length < 3 || name.length > 32) {
        return log('Username must be between 3 and 32 characters long.');
      }

      return doChangeUsername(name);
    },
  },
);
