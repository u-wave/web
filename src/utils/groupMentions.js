import { createSelector } from 'reselect';
import { userListSelector } from '../selectors/userSelectors';
import { djAndWaitlistUsersSelector } from '../selectors/waitlistSelectors';

const ROLE_MANAGER = 3;
const ROLE_MODERATOR = 2;
const ROLE_USER = 0;

export const everyone = {
  role: ROLE_MANAGER,
  users: userListSelector
};

// plug.dj-like.
export const djs = {
  role: ROLE_MODERATOR,
  users: djAndWaitlistUsersSelector
};
export const waitlist = djs;

export const staff = {
  role: ROLE_USER,
  users: createSelector(
    userListSelector,
    users => users.filter(user => user.role > 1)
  )
};
