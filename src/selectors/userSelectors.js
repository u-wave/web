import { createSelector } from 'reselect';

const authSelector = state => state.auth;

export const usersSelector = state => state.users;

export const currentUserSelector = createSelector(authSelector, auth => auth.user);
