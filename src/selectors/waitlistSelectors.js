import { createSelector, createStructuredSelector } from 'reselect';
import { timeRemainingSelector, isCurrentDJSelector } from './boothSelectors';
import { currentUserSelector, usersSelector } from './userSelectors';

const baseSelector = state => state.waitlist;

const lockedSelector = createSelector(baseSelector, wl => wl.locked);
const waitlistIDsSelector = createSelector(baseSelector, wl => wl.waitlist);

export const sizeSelector = createSelector(
  waitlistIDsSelector,
  list => list.length
);

export const waitlistUsersSelector = createSelector(
  waitlistIDsSelector,
  usersSelector,
  (ids, users) => ids.map(id => users[id])
);

export const positionSelector = createSelector(
  waitlistIDsSelector,
  currentUserSelector,
  (ids, user) => {
    if (!user) return -1;
    const position = ids.indexOf(user._id);
    if (position === -1) return -1;
    return position;
  }
);

export const userInWaitlistSelector = createSelector(
  positionSelector,
  isCurrentDJSelector,
  (position, isDJ) => position !== -1 || isDJ
);

export const waitlistSelector = createStructuredSelector({
  locked: lockedSelector,
  users: waitlistUsersSelector
});

// Most videos come in at around 4 minutes.
const averagePlayDuration = 4 * 60;
export const etaSelector = createSelector(
  timeRemainingSelector,
  positionSelector,
  sizeSelector,
  (remaining, position, size) =>
    (position === -1 ? size : position) * averagePlayDuration + remaining
);
