import { createSelector } from 'reselect';

import { isPreviewMediaDialogOpenSelector } from './dialogSelectors';
import { isMutedSelector, volumeSelector } from './settingSelectors';
import { currentTimeSelector } from './timeSelectors';
import { currentUserSelector, usersSelector } from './userSelectors';

const baseSelector = state => state.booth;

export const historyIDSelector = createSelector(baseSelector, booth => booth.historyID);
export const mediaSelector = createSelector(baseSelector, booth => booth.media);
export const startTimeSelector = createSelector(baseSelector, booth => booth.startTime || 0);

export const mediaDurationSelector = createSelector(
  mediaSelector,
  media => (media ? media.end - media.start : 0)
);

export const timeElapsedSelector = createSelector(
  startTimeSelector,
  currentTimeSelector,
  // in seconds! because media duration is in seconds, too.
  (startTime, currentTime) => (startTime ? Math.max((currentTime - startTime) / 1000, 0) : 0)
);

export const timeRemainingSelector = createSelector(
  mediaDurationSelector,
  timeElapsedSelector,
  (duration, elapsed) => (duration > 0 ? duration - elapsed : 0)
);

export const mediaProgressSelector = createSelector(
  mediaDurationSelector,
  timeElapsedSelector,
  (duration, elapsed) => (
    duration
      // Ensure that the result is between 0 and 1
      ? Math.max(0, Math.min(1, elapsed / duration))
      : 0
  )
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

// TODO use a permissions-based system instead of role IDs:
// "user.can('booth.skip')"
const ROLE_MODERATOR = 2;
export const canSkipSelector = createSelector(
  historyIDSelector,
  isCurrentDJSelector,
  currentUserSelector,
  (historyID, isCurrentDJ, user) => {
    if (!historyID || !user) {
      return false;
    }
    return isCurrentDJ || user.role >= ROLE_MODERATOR;
  }
);

export const playbackVolumeSelector = createSelector(
  volumeSelector,
  isMutedSelector,
  isPreviewMediaDialogOpenSelector,
  (volume, isMuted, isPreviewMediaDialogOpen) =>
    (isMuted || isPreviewMediaDialogOpen ? 0 : volume)
);
