import { createSelector } from 'reselect';

import { isPreviewMediaDialogOpenSelector } from './dialogSelectors';
import { isMutedSelector, volumeSelector } from './settingSelectors';
import { currentTimeSelector } from './timeSelectors';
import {
  currentUserSelector,
  currentUserHasRoleSelector,
  usersSelector,
} from './userSelectors';

const baseSelector = state => state.booth;

export const historyIDSelector = createSelector(baseSelector, booth => booth.historyID);
export const mediaSelector = createSelector(baseSelector, booth => booth.media);
export const startTimeSelector = createSelector(baseSelector, booth => booth.startTime || 0);

export const mediaDurationSelector = createSelector(
  mediaSelector,
  media => (media ? media.end - media.start : 0),
);

export const endTimeSelector = createSelector(
  startTimeSelector,
  mediaDurationSelector,
  (startTime, duration) => startTime + (duration * 1000) || 0,
);

export const timeElapsedSelector = createSelector(
  startTimeSelector,
  currentTimeSelector,
  // in seconds! because media duration is in seconds, too.
  (startTime, currentTime) => (startTime ? Math.max((currentTime - startTime) / 1000, 0) : 0),
);

export const timeRemainingSelector = createSelector(
  mediaDurationSelector,
  timeElapsedSelector,
  (duration, elapsed) => (duration > 0 ? duration - elapsed : 0),
);

export const mediaProgressSelector = createSelector(
  mediaDurationSelector,
  timeElapsedSelector,
  (duration, elapsed) => (
    duration
      // Ensure that the result is between 0 and 1
      // It can be outside this range if a network or server hiccup
      // results in an advance event getting delayed.
      ? Math.max(0, Math.min(1, elapsed / duration))
      : 0
  ),
);

export const djSelector = createSelector(
  baseSelector,
  usersSelector,
  (booth, users) => users[booth.djID],
);

export const isCurrentDJSelector = createSelector(
  djSelector,
  currentUserSelector,
  (dj, me) => (
    dj && me ? dj._id === me._id : false
  ),
);

export const canSkipSelector = createSelector(
  historyIDSelector,
  isCurrentDJSelector,
  currentUserHasRoleSelector,
  (historyID, isCurrentDJ, hasRole) => {
    if (!historyID) {
      return false;
    }
    return isCurrentDJ ? hasRole('booth.skip.self') : hasRole('booth.skip.other');
  },
);

// Playback should be muted when the user requested it,
// and when a media preview dialog is open. (Otherwise their audio will interfere.)
const playbackMutedSelector = createSelector(
  isMutedSelector,
  isPreviewMediaDialogOpenSelector,
  (isMuted, isPreviewMediaDialogOpen) => isMuted || isPreviewMediaDialogOpen,
);

export const playbackVolumeSelector = createSelector(
  volumeSelector,
  playbackMutedSelector,
  (volume, isMuted) => (isMuted ? 0 : volume),
);

export const mobilePlaybackVolumeSelector = createSelector(
  playbackMutedSelector,
  isMuted => (isMuted ? 0 : 100),
);
