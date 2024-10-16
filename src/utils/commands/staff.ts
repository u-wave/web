import { findUser, type Command } from '../ChatCommands';
import { log } from '../../reducers/chat';
import { rolesSelector } from '../../reducers/config';
import {
  userListSelector,
  isModeratorSelector,
  isManagerSelector,
  addUserRole,
  removeUserRole,
} from '../../reducers/users';
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
      if (user == null) {
        return dispatch(log('Provide a user to promote or demote.'));
      }
      return dispatch(addUserRole({ userID: user._id, role }));
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
      if (user == null) {
        return dispatch(log('Provide a user to promote or demote.'));
      }
      return dispatch(removeUserRole({ userID: user._id, role }));
    },
  },
  {
    name: 'admin',
    description: 'Open the administration panel.',
    guard: isModeratorSelector,
    action: () => toggleOverlay('admin'),
  },
] satisfies Command[];
