import { createSelector, createStructuredSelector } from 'reselect';
import { currentTimeSelector } from './timeSelectors';
import { usersSelector } from './userSelectors';

const baseSelector = state => state.booth;

const historyIDSelector = createSelector(baseSelector, booth => booth.historyID);
export const mediaSelector = createSelector(baseSelector, booth => booth.media);
export const startTimeSelector = createSelector(baseSelector, booth => booth.startTime || 0);

export const mediaDurationSelector = createSelector(
  mediaSelector,
  media => media ? media.end - media.start : 0
);

const timeElapsedSelector = createSelector(
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

export const videoSelector = createStructuredSelector({
  historyID: historyIDSelector,
  media: mediaSelector,
  startTime: startTimeSelector
});
