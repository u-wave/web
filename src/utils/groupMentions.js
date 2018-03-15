import { createSelector } from 'reselect';
import { userListSelector, hasRoleSelector } from '../selectors/userSelectors';
import { djAndWaitlistUsersSelector } from '../selectors/waitlistSelectors';

export const everyone = userListSelector;

// plug.dj-like.
export const djs = djAndWaitlistUsersSelector;
export const waitlist = djs;

export const staff = createSelector(
  userListSelector,
  hasRoleSelector,
  // TODO should this maybe not hardcode the 'moderator' role? How to do it
  // otherwise?
  (users, hasRole) => users.map(user => hasRole(user, 'moderator')),
);
