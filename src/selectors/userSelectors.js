import { createSelector } from '@reduxjs/toolkit';
import { rolesSelector } from '../reducers/config';
import { currentUserSelector, supportsAuthStrategy } from '../reducers/auth';

export { userListSelector } from '../reducers/users';

export const supportsSocialAuthSelector = createSelector(
  supportsAuthStrategy('google'),
  (...support) => support.some(Boolean),
);

// The Super User role allows a user to do everything. It's hardcoded as the "*"
// role.
const superUserRoleSelector = () => '*';

// Flatten a user's roles.
function getAllUserRoles(roles, user) {
  function getSubRoles(subRoles, role) {
    // Recursive Reduce!
    return roles[role].reduce(
      getSubRoles,
      [role, ...subRoles],
    );
  }
  return user.roles ? user.roles.reduce(getSubRoles, []) : [];
}

/** @param {import('../redux/configureStore').StoreState} state */
function userHasRole(state, user, role) {
  const roles = rolesSelector(state);
  const userRoles = getAllUserRoles(roles, user);

  // If this is a super user, we always return true.
  const superUserRole = superUserRoleSelector(state);
  if (userRoles.includes(superUserRole)) {
    return true;
  }

  return userRoles.includes(role);
}

export const userHasRoleSelector = (state) => {
  return (user) => {
    // If there is no authenticated user, we always return false.
    if (user == null) {
      return () => false;
    }

    return (role) => userHasRole(state, user, role);
  };
};

// Selects a function that checks if a user has the given role.
//
//   const hasRole = hasRoleSelector(getState());
//   hasRole(user, 'waitlist.join');
//
/** @param {import('../redux/configureStore').StoreState} state */
export const hasRoleSelector = (state) => userHasRole.bind(null, state);

/** @param {import('../redux/configureStore').StoreState} state */
export const currentUserHasRoleSelector = (state) => {
  const user = currentUserSelector(state);
  return user ? userHasRole.bind(null, state, user) : () => false;
};

// Creates a selector that will check if the current user has a given role.
//
//   createRoleCheckSelector('some.role')(store.getState()) // → true/false
//
export const createRoleCheckSelector = (role) => createSelector(
  currentUserHasRoleSelector,
  (hasRole) => hasRole(role),
);

// Selectors for compatibility with the old role system.
// TODO All uses of these selectors should be phased out in favour of more
// specific roles in the future.
export const isModeratorSelector = createRoleCheckSelector('moderator');
export const isManagerSelector = createRoleCheckSelector('manager');
