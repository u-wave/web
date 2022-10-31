import { log } from '../../actions/ChatActionCreators';
import { doChangeUsername } from '../../actions/UserActionCreators';

export default [{
  name: 'nick',
  description: 'Change your username.',
  action: (_commander, name) => {
    if (name.length < 3 || name.length > 32) {
      return log('Username must be between 3 and 32 characters long.');
    }

    return doChangeUsername(name);
  },
}];
