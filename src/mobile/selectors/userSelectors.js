import { createSelector } from 'reselect';
import { userListSelector } from '../../selectors/userSelectors';
import { waitlistUsersSelector } from '../../selectors/waitlistSelectors';

export * from '../../selectors/userSelectors';

export const listenersSelector = createSelector(
  userListSelector,
  waitlistUsersSelector,
  (users, waitlist) => users.filter(user =>
    !waitlist.some(waiting => waiting._id === user._id)
  )
);
