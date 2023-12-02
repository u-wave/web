import { findUser } from '../ChatCommands';
import { log } from '../../actions/ChatActionCreators';
import { rolesSelector } from '../../selectors/configSelectors';
import {
  userListSelector,
  isModeratorSelector,
  isManagerSelector,
} from '../../selectors/userSelectors';
import {
  addUserRole,
  removeUserRole,
} from '../../actions/ModerationActionCreators';
import { toggleOverlay } from '../../reducers/activeOverlay';

export default [
  {
    name: 'roles',
    description: 'List roles.',
    action: () => (dispatch, getState) => {
      const allRoles = Object.keys(rolesSelector(getState()));
      const roles = allRoles.filter((role) => !role.includes('.'));
      const permissions = allRoles.filter((role) => role.includes('.'));

      dispatch(log(`Roles: ${roles.join(', ')}`));
      return dispatch(log(`Permissions: ${permissions.join(', ')}`));
    },
  },
  {
    name: 'addrole',
    description: 'Assign a role to a user. Syntax: "/addrole username role"',
    guard: isManagerSelector,
    action: (_commander, username, role) => (dispatch, getState) => {
      if (!username) {
        return dispatch(log('Provide a user to promote or demote.'));
      }
      if (!role) {
        return dispatch(log(`Provide a role to assign to ${username}. Use /roles for a full list.`));
      }
      const user = findUser(
        userListSelector(getState()),
        username,
      );
      return dispatch(addUserRole(user, role));
    },
  },
  {
    name: 'removerole',
    description: 'Remove a role from a user. Syntax: "/removerole username role"',
    guard: isManagerSelector,
    action: (_commander, username, role) => (dispatch, getState) => {
      if (!username) {
        return dispatch(log('Provide a user to promote or demote.'));
      }
      if (!role) {
        return dispatch(log(`Provide a role assign to ${username}. Use /roles for a full list.`));
      }
      const user = findUser(
        userListSelector(getState()),
        username,
      );
      return dispatch(removeUserRole(user, role));
    },
  },
  {
    name: 'admin',
    description: 'Open the administration panel.',
    guard: isModeratorSelector,
    action: () => toggleOverlay('admin'),
  },
];
