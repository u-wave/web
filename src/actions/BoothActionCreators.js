import { mutate } from 'swr';
import { BOOTH_SKIP } from '../constants/ActionTypes';
import { flattenPlaylistItem } from './PlaylistActionCreators';
import { post } from './RequestActionCreators';
import { isCurrentDJSelector, currentPlaySelector } from '../selectors/boothSelectors';
import { usersSelector } from '../selectors/userSelectors';
import * as actions from '../reducers/booth';

/**
 * Set the current song and DJ.
 */
export function advance(nextBooth) {
  return (dispatch, getState) => {
    let payload = null;
    if (nextBooth && nextBooth.historyID) {
      // TODO this should be done in the reducer?
      const user = usersSelector(getState())[nextBooth.userID];
      payload = {
        userID: nextBooth.userID,
        historyID: nextBooth.historyID,
        playlistID: nextBooth.playlistID,
        user,
        media: flattenPlaylistItem(nextBooth.media),
        timestamp: nextBooth.playedAt,
      };
    }

    dispatch(actions.advance(payload, currentPlaySelector(getState())));

    mutate('/booth/history');
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
