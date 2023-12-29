import { createSelector } from 'reselect';
import { hasRoleSelector } from '../selectors/userSelectors';
import { userListSelector } from '../reducers/users';
import { djAndWaitlistUsersSelector } from '../reducers/waitlist';

export const everyone = userListSelector;

// plug.dj-like.
export const djs = djAndWaitlistUsersSelector;
export const waitlist = djs;

export const staff = createSelector(
  [userListSelector, hasRoleSelector],
  // TODO should this maybe not hardcode the 'moderator' role? How to do it
  // otherwise?
  (users, hasRole) => users.map((user) => hasRole(user, 'moderator')),
);
