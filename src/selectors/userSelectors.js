import { createSelector } from 'reselect';
import naturalCmp from 'natural-compare';
import values from 'object-values';
import { rolesSelector } from './configSelectors';

const authSelector = state => state.auth;

const usersBaseSelector = state => state.users;
export const usersSelector = createSelector(usersBaseSelector, base => base.users);

export const authErrorSelector = createSelector(authSelector, auth => auth.error);
export const currentUserSelector = createSelector(authSelector, auth => auth.user);
export const isLoggedInSelector = createSelector(currentUserSelector, Boolean);
export const tokenSelector = createSelector(authSelector, auth => auth.token);
export const authStrategiesSelector = createSelector(authSelector, auth => auth.strategies);
export function supportsAuthStrategy(name) {
  return createSelector(authStrategiesSelector, strategies => strategies.indexOf(name) !== -1);
}
export const supportsSocialAuthSelector = createSelector(
  supportsAuthStrategy('google'),
  (...support) => support.some(Boolean)
);

const currentRoleSelector = createSelector(
  currentUserSelector,
  user => (user ? user.role : 0)
);

export const isModeratorSelector = createSelector(
  currentRoleSelector,
  role => role >= 2
);

export const isManagerSelector = createSelector(
  currentRoleSelector,
  role => role >= 3
);

function compareUsers(a, b) {
  if (a.role > b.role) {
    return -1;
  }
  if (a.role < b.role) {
    return 1;
  }
  return naturalCmp(a.username.toLowerCase(), b.username.toLowerCase());
}

export const userListSelector = createSelector(
  usersSelector,
  users => values(users).sort(compareUsers)
);

export const userCountSelector = createSelector(
  userListSelector,
  users => users.length
);

export const guestCountSelector = createSelector(
  usersBaseSelector,
  base => base.guests
);

export const listenerCountSelector = createSelector(
  userCountSelector,
  guestCountSelector,
  (users, guests) => users + guests
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
      [ role, ...subRoles ]
    );
  }
  return user.roles ? user.roles.reduce(getSubRoles, []) : [];
}

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
    if (userRoles.indexOf(superUserRole) !== -1) {
      return () => true;
    }

    return role => userRoles.indexOf(role) !== -1;
  }
);

// Selects a function that checks if a user has the given role.
//
//   const hasRole = hasRoleSelector(getState());
//   hasRole(user, 'waitlist.join');
//
export const hasRoleSelector = createSelector(
  userHasRoleSelector,
  userHasRole =>
    (user, role) => userHasRole(user)(role)
);

export const currentUserHasRoleSelector = createSelector(
  userHasRoleSelector,
  currentUserSelector,
  (userHasRole, user) => userHasRole(user)
);

export const createRoleCheckSelector = role => createSelector(
  currentUserHasRoleSelector,
  hasRole => hasRole(role)
);
