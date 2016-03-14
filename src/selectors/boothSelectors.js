import { createSelector, createStructuredSelector } from 'reselect';
import { currentTimeSelector } from './timeSelectors';
import { currentUserSelector, usersSelector } from './userSelectors';

const baseSelector = state => state.booth;

export const historyIDSelector = createSelector(baseSelector, booth => booth.historyID);
export const mediaSelector = createSelector(baseSelector, booth => booth.media);
export const startTimeSelector = createSelector(baseSelector, booth => booth.startTime || 0);

export const mediaDurationSelector = createSelector(
  mediaSelector,
  media => media ? media.end - media.start : 0
);

export const timeElapsedSelector = createSelector(
  startTimeSelector,
  currentTimeSelector,
  // in seconds! because media duration is in seconds, too.
  (startTime, currentTime) => startTime ? (currentTime - startTime) / 1000 : 0
);

export const timeRemainingSelector = createSelector(
  mediaDurationSelector,
  timeElapsedSelector,
  (duration, elapsed) => duration > 0 ? duration - elapsed : 0
);

export const mediaProgressSelector = createSelector(
  mediaDurationSelector,
  timeElapsedSelector,
  (duration, elapsed) => duration ? elapsed / duration : 0
);

export const djSelector = createSelector(
  baseSelector,
  usersSelector,
  (booth, users) => users[booth.djID]
);

export const isCurrentDJSelector = createSelector(
  djSelector,
  currentUserSelector,
  (dj, me) => dj && me && dj._id === me._id
);

export const videoSelector = createStructuredSelector({
  historyID: historyIDSelector,
  media: mediaSelector,
  seek: timeElapsedSelector
});

export const canSkipSelector = createSelector(
  historyIDSelector,
  isCurrentDJSelector,
  currentUserSelector,
  (historyID, isCurrentDJ, user) => {
    if (!historyID || !user) {
      return false;
    }
    // TODO also allow when user is moderator
    return isCurrentDJ;
  }
);
