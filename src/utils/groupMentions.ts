import { userListSelector, userHasRoleSelector } from '../reducers/users';
import { djAndWaitlistUsersSelector } from '../reducers/waitlist';
import type { StoreState } from '../redux/configureStore';

const everyone = userListSelector;

// plug.dj-like.
const djs = djAndWaitlistUsersSelector;
const waitlist = djs;

function staff(state: StoreState) {
  const users = userListSelector(state);
  return users.filter((user) => {
    // TODO should this maybe not hardcode the 'moderator' role? How to do it
    // otherwise?
    return userHasRoleSelector(state, user, 'moderator');
  });
}

export default {
  everyone,
  djs,
  waitlist,
  staff,
};
