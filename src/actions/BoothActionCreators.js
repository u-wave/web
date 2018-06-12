import {
  ADVANCE,
  BOOTH_SKIP,
  LOAD_HISTORY_START, LOAD_HISTORY_COMPLETE,
} from '../constants/ActionTypes';
import { flattenPlaylistItem } from './PlaylistActionCreators';
import { get, post } from './RequestActionCreators';
import { historyIDSelector, isCurrentDJSelector } from '../selectors/boothSelectors';
import { currentPlaySelector } from '../selectors/roomHistorySelectors';
import { usersSelector } from '../selectors/userSelectors';
import mergeIncludedModels from '../utils/mergeIncludedModels';

/**
 * Set the media metadata in some mobile browsers.
 */
function setMediaMetadata({ artist, title, thumbnail }) {
  return () => {
    if ('mediaSession' in navigator && window.MediaMetadata) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        artist,
        title,
        artwork: [ { src: thumbnail } ]
      });
    }
  };
}

export function advanceToEmpty() {
  return (dispatch, getState) => {
    dispatch({
      type: ADVANCE,
      payload: null,
      meta: { previous: currentPlaySelector(getState()) },
    });
  };
}

/**
 * Set the current song and DJ.
 */
export function advance(nextBooth) {
  if (!nextBooth || !nextBooth.historyID) {
    return advanceToEmpty();
  }
  const {
    media, userID, historyID, playlistID, playedAt,
  } = nextBooth;
  return (dispatch, getState) => {
    const user = usersSelector(getState())[userID];
    const item = flattenPlaylistItem(media);
    dispatch({
      type: ADVANCE,
      payload: {
        userID,
        historyID,
        playlistID,
        user,
        media: item,
        timestamp: playedAt,
      },
      meta: {
        previous: currentPlaySelector(getState()),
      },
    });

    dispatch(setMediaMetadata(item));
  };
}

export function skipSelf(opts = {}) {
  const remove = !!opts.remove;
  return (dispatch, getState) => {
    if (isCurrentDJSelector(getState())) {
      return dispatch(post('/booth/skip', { remove }));
    }
    return Promise.reject(new Error('You\'re not currently playing.'));
  };
}

export function skipped({ userID, moderatorID, reason }) {
  return (dispatch, getState) => {
    const users = usersSelector(getState());
    dispatch({
      type: BOOTH_SKIP,
      payload: {
        user: users[userID],
        moderator: users[moderatorID],
        reason,
        timestamp: Date.now(),
      },
    });
  };
}

export function loadHistoryStart() {
  return { type: LOAD_HISTORY_START };
}

export function loadHistoryComplete(response) {
  return (dispatch, getState) => {
    const currentHistoryID = historyIDSelector(getState());
    const { meta } = response;
    let playHistory = mergeIncludedModels(response);
    if (playHistory[0] && playHistory[0]._id === currentHistoryID) {
      playHistory = playHistory.slice(1);
    }
    dispatch({
      type: LOAD_HISTORY_COMPLETE,
      payload: playHistory,
      meta: {
        page: Math.floor(meta.offset / meta.pageSize),
        size: meta.pageSize,
      },
    });
  };
}

export function loadHistory() {
  return get('/booth/history', {
    onStart: loadHistoryStart,
    onComplete: loadHistoryComplete,
  });
}
