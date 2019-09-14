import { createSelector } from 'reselect';
import { userListSelector } from '../../selectors/userSelectors';
import { djAndWaitlistUsersSelector } from '../../selectors/waitlistSelectors';

export * from '../../selectors/userSelectors';

export const listenersSelector = createSelector(
  userListSelector,
  djAndWaitlistUsersSelector,
  (users, waitlist) => {
    function isInWaitlist(user) {
      return waitlist.some((waiting) => waiting._id === user._id);
    }

    return users.filter((user) => !isInWaitlist(user));
  },
);
