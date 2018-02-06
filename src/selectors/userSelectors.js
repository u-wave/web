import { createSelector } from 'reselect';
import naturalCmp from 'natural-compare';
import values from 'object-values';

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
