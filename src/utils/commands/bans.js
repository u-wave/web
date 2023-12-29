import ms from 'ms';
import { findUser } from '../ChatCommands';
import { log } from '../../reducers/chat';
import {
  userListSelector,
  isModeratorSelector,
} from '../../reducers/users';
import { banUser } from '../../actions/ModerationActionCreators';

export default [{
  name: 'ban',
  description: 'Ban a user. Syntax: "/ban username duration" or "/ban username perma"',
  guard: isModeratorSelector,
  action: (_commander, username, duration = 'perma') => (dispatch, getState) => {
    if (!username) {
      return dispatch(log('Provide a user to ban.'));
    }
    const user = findUser(
      userListSelector(getState()),
      username,
    );
    if (!user) {
      return dispatch(log(`User "${username}" is not online.`));
    }
    const permanent = duration === 'perma';
    return dispatch(banUser(user, {
      duration: permanent ? undefined : ms(`${duration}`),
      permanent,
    }));
  },
}];
