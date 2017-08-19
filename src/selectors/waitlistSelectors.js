import { createSelector, createStructuredSelector } from 'reselect';
import { timeRemainingSelector, djSelector, isCurrentDJSelector } from './boothSelectors';
import { currentUserSelector, usersSelector } from './userSelectors';

const baseSelector = state => state.waitlist;

export const isLockedSelector = createSelector(baseSelector, wl => !!wl.locked);
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

export const djAndWaitlistUsersSelector = createSelector(
  djSelector,
  waitlistUsersSelector,
  (dj, waitlist) => (dj ? [ dj, ...waitlist ] : waitlist)
);

export const positionSelector = createSelector(
  waitlistIDsSelector,
  currentUserSelector,
  (ids, user) => {
    if (!user) return -1;
    return ids.indexOf(user._id);
  }
);

export const userInWaitlistSelector = createSelector(
  positionSelector,
  isCurrentDJSelector,
  (position, isDJ) => position !== -1 || isDJ
);

export const waitlistSelector = createStructuredSelector({
  locked: isLockedSelector,
  users: waitlistUsersSelector
});

// Most videos come in at around 4 minutes.
const averagePlayDuration = 4 * 60 * 1000;
export const baseEtaSelector = createSelector(
  positionSelector,
  sizeSelector,
  (position, size) =>
    (position === -1 ? size : position) * averagePlayDuration
);

export const etaSelector = createSelector(
  baseEtaSelector,
  timeRemainingSelector,
  (eta, remaining) => eta + remaining
);
