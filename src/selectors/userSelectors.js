import { createSelector } from 'reselect';
import naturalCmp from 'natural-compare';
import values from 'object-values';

const authSelector = state => state.auth;

export const usersSelector = state => state.users;

export const authErrorSelector = createSelector(authSelector, auth => auth.error);
export const currentUserSelector = createSelector(authSelector, auth => auth.user);

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
