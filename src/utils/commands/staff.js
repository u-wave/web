import { register, findUser } from '../ChatCommands';
import { log } from '../../actions/ChatActionCreators';

import {
  userListSelector,
  isManagerSelector
} from '../../selectors/userSelectors';
import { setUserRole } from '../../actions/ModerationActionCreators';

const roleNames = {
  user: 0,
  default: 0,
  normal: 0,
  none: 0,
  special: 1,
  moderator: 2,
  mod: 2,
  manager: 3,
  admin: 4
};
register(
  'userrole',
  'Assign a different role to a user. Syntax: "/userrole username role"',
  {
    guard: isManagerSelector,
    action: (username, role) => (dispatch, getState) => {
      if (!username) {
        return dispatch(log('Provide a user to promote or demote.'));
      }
      if (!(role in roleNames)) {
        return dispatch(log(`Provide a role to promote ${username} to. [user, special, moderator, manager, admin]`));
      }
      const user = findUser(
        userListSelector(getState()),
        username
      );
      return dispatch(setUserRole(user, roleNames[role]));
    }
  }
);
