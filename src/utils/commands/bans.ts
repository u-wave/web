import ms from 'ms';
import { findUser, type Command } from '../ChatCommands';
import { log } from '../../reducers/chat';
import {
  banUser,
  userListSelector,
  isModeratorSelector,
} from '../../reducers/users';

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
    return dispatch(banUser({
      userID: user._id,
      duration: permanent ? undefined : ms(`${duration}`),
      permanent,
    }));
  },
}] satisfies Command[];
