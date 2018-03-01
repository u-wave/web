import { register, findUser } from '../ChatCommands';
import { log } from '../../actions/ChatActionCreators';

import {
  rolesSelector
} from '../../selectors/configSelectors';
import {
  userListSelector,
  isManagerSelector
} from '../../selectors/userSelectors';
import {
  addUserRole,
  removeUserRole
} from '../../actions/ModerationActionCreators';

register(
  'roles',
  'List roles.',
  {
    action: () => (dispatch, getState) => {
      const roles = rolesSelector(getState());
      return dispatch(log(Object.keys(roles).join(', ')));
    }
  }
);

register(
  'addrole',
  'Assign a role to a user. Syntax: "/addrole username role"',
  {
    guard: isManagerSelector,
    action: (username, role) => (dispatch, getState) => {
      if (!username) {
        return dispatch(log('Provide a user to promote or demote.'));
      }
      if (!role) {
        return dispatch(log(`Provide a role to assign to ${username}. Use /roles for a full list.`));
      }
      const user = findUser(
        userListSelector(getState()),
        username
      );
      return dispatch(addUserRole(user, role));
    }
  }
);

register(
  'removerole',
  'Remove a role from a user. Syntax: "/removerole username role"',
  {
    guard: isManagerSelector,
    action: (username, role) => (dispatch, getState) => {
      if (!username) {
        return dispatch(log('Provide a user to promote or demote.'));
      }
      if (!role) {
        return dispatch(log(`Provide a role assign to ${username}. Use /roles for a full list.`));
      }
      const user = findUser(
        userListSelector(getState()),
        username
      );
      return dispatch(removeUserRole(user, role));
    }
  }
);
