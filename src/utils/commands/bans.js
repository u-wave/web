import ms from 'ms';
import { register, findUser } from '../ChatCommands';
import { log } from '../../actions/ChatActionCreators';

import {
  userListSelector,
  isModeratorSelector,
} from '../../selectors/userSelectors';
import { banUser } from '../../actions/ModerationActionCreators';

register(
  'ban',
  'Ban a user. Syntax: "/ban username duration" or "/ban username perma"',
  {
    guard: isModeratorSelector,
    action: (username, duration = 'perma') => (dispatch, getState) => {
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
  },
);
