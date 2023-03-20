import { mutate } from 'swr';
import {
  ADVANCE,
  BOOTH_SKIP,
} from '../constants/ActionTypes';
import { flattenPlaylistItem } from './PlaylistActionCreators';
import { post } from './RequestActionCreators';
import { isCurrentDJSelector, currentPlaySelector } from '../selectors/boothSelectors';
import { usersSelector } from '../selectors/userSelectors';

export function advanceToEmpty() {
  return (dispatch, getState) => {
    mutate('/booth/history');
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
    mutate('/booth/history');
    dispatch({
      type: ADVANCE,
      payload: {
        userID,
        historyID,
        playlistID,
        user,
        media: flattenPlaylistItem(media),
        timestamp: playedAt,
      },
      meta: {
        previous: currentPlaySelector(getState()),
      },
    });
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
