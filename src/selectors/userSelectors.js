import { createSelector } from 'reselect';
import naturalCmp from 'natural-compare';
import { rolesSelector } from './configSelectors';

const authSelector = state => state.auth;

const usersBaseSelector = state => state.users;
export const usersSelector = createSelector(usersBaseSelector, base => base.users);

export const authErrorSelector = createSelector(authSelector, auth => auth.error);
const currentUserIDSelector = createSelector(authSelector, auth => auth.user);
export const currentUserSelector = createSelector(
  usersSelector,
  currentUserIDSelector,
  (users, userID) => (
    userID in users
      ? users[userID]
      : null
  ),
);
export const isLoggedInSelector = createSelector(currentUserSelector, Boolean);
export const tokenSelector = createSelector(authSelector, auth => auth.token);
export const authStrategiesSelector = createSelector(authSelector, auth => auth.strategies);
export function supportsAuthStrategy(name) {
  return createSelector(authStrategiesSelector, strategies => strategies.includes(name));
}
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

function compareUsers(roles, superuser) {
  return (a, b) => {
    const aRoles = getAllUserRoles(roles, a);
    const bRoles = getAllUserRoles(roles, b);
    // Sort superusers to the top,
    if (aRoles.includes(superuser)) {
      return -1;
    }
    if (bRoles.includes(superuser)) {
      return 1;
    }
    // other users by the amount of permissions they have,
    if (aRoles.length > bRoles.length) {
      return -1;
    }
    if (aRoles.length < bRoles.length) {
      return 1;
    }
    // and sort by username if the roles are equal.
    return naturalCmp(a.username.toLowerCase(), b.username.toLowerCase());
  };
}

export const userListSelector = createSelector(
  rolesSelector,
  superUserRoleSelector,
  usersSelector,
  (roles, superuserRole, users) => Object.values(users).sort(compareUsers(roles, superuserRole)),
);

export const userCountSelector = createSelector(
  userListSelector,
  users => users.length,
);

export const guestCountSelector = createSelector(
  usersBaseSelector,
  base => base.guests,
);

export const listenerCountSelector = createSelector(
  userCountSelector,
  guestCountSelector,
  (users, guests) => users + guests,
);

export const userHasRoleSelector = createSelector(
  rolesSelector,
  superUserRoleSelector,
  (roles, superUserRole) => (user) => {
    // If there is no authenticated user, we always return false.
    if (!user) {
      return () => false;
    }

    const userRoles = getAllUserRoles(roles, user);
    // If this is a super user, we always return true.
    if (userRoles.includes(superUserRole)) {
      return () => true;
    }

    return role => userRoles.includes(role);
  },
);

// Selects a function that checks if a user has the given role.
//
//   const hasRole = hasRoleSelector(getState());
//   hasRole(user, 'waitlist.join');
//
export const hasRoleSelector = createSelector(
  userHasRoleSelector,
  userHasRole => (user, role) => userHasRole(user)(role),
);

export const currentUserHasRoleSelector = createSelector(
  userHasRoleSelector,
  currentUserSelector,
  (userHasRole, user) => userHasRole(user),
);

// Creates a selector that will check if the current user has a given role.
//
//   createRoleCheckSelector('some.role')(store.getState()) // → true/false
//
export const createRoleCheckSelector = role => createSelector(
  currentUserHasRoleSelector,
  hasRole => hasRole(role),
);

// Selectors for compatibility with the old role system.
// TODO All uses of these selectors should be phased out in favour of more
// specific roles in the future.
export const isModeratorSelector = createRoleCheckSelector('moderator');
export const isManagerSelector = createRoleCheckSelector('manager');
