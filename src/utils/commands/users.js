import { log } from '../../reducers/chat';
import { changeUsername } from '../../reducers/auth';

export default [{
  name: 'nick',
  description: 'Change your username.',
  action: (_commander, name) => {
    if (name.length < 3 || name.length > 32) {
      return log('Username must be between 3 and 32 characters long.');
    }

    return changeUsername(name);
  },
}];
