import { userListSelector, userHasRoleSelector } from '../reducers/users';
import { djAndWaitlistUsersSelector } from '../reducers/waitlist';

export const everyone = userListSelector;

// plug.dj-like.
export const djs = djAndWaitlistUsersSelector;
export const waitlist = djs;

export function staff(state) {
  const users = userListSelector(state);
  return users.filter((user) => {
    // TODO should this maybe not hardcode the 'moderator' role? How to do it
    // otherwise?
    return userHasRoleSelector(state, user, 'moderator');
  });
}
