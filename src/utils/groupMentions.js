import { createSelector } from 'reselect';
import { userListSelector } from '../selectors/userSelectors';
import { djAndWaitlistUsersSelector } from '../selectors/waitlistSelectors';

export const everyone = userListSelector;

// plug.dj-like.
export const djs = djAndWaitlistUsersSelector;
export const waitlist = djs;

export const staff = createSelector(
  userListSelector,
  users => users.filter(user => user.role > 1)
);
