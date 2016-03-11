import {
  ADVANCE,
  LOAD_HISTORY_START, LOAD_HISTORY_COMPLETE
} from '../constants/actionTypes/booth';
import { flattenPlaylistItem } from './PlaylistActionCreators';
import { get, post } from '../utils/Request';

import { historyIDSelector, isCurrentDJSelector } from '../selectors/boothSelectors';
import { currentPlaySelector } from '../selectors/roomHistorySelectors';
import { usersSelector, tokenSelector } from '../selectors/userSelectors';

export function advanceToEmpty() {
  return (dispatch, getState) => {
    dispatch({
      type: ADVANCE,
      payload: null,
      meta: { previous: currentPlaySelector(getState()) }
    });
  };
}

/**
 * Set the current song and DJ.
 */
export function advance(nextBooth) {
  if (!nextBooth) {
    return advanceToEmpty();
  }
  const { media, userID, historyID, playlistID, played } = nextBooth;
  return (dispatch, getState) => {
    const user = usersSelector(getState())[userID];
    dispatch({
      type: ADVANCE,
      payload: {
        userID, historyID, playlistID, user,
        media: flattenPlaylistItem(media),
        timestamp: played
      },
      meta: {
        previous: currentPlaySelector(getState())
      }
    });
  };
}

export function skipSelf() {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());

    if (isCurrentDJSelector(getState())) {
      return post(jwt, '/v1/booth/skip');
    }
    return Promise.reject(new Error('You\'re not currently playing.'));
  };
}

export function loadHistoryStart() {
  return { type: LOAD_HISTORY_START };
}

export function loadHistoryComplete({ result, page, size }) {
  return (dispatch, getState) => {
    const currentHistoryID = historyIDSelector(getState());
    let playHistory = result;
    if (result[0] && result[0]._id === currentHistoryID) {
      playHistory = playHistory.slice(1);
    }
    dispatch({
      type: LOAD_HISTORY_COMPLETE,
      payload: playHistory,
      meta: { page, size }
    });
  };
}

export function loadHistory() {
  return dispatch => {
    dispatch(loadHistoryStart());
    get(null, '/v1/booth/history')
      .then(res => res.json())
      .then(history => dispatch(loadHistoryComplete(history)));
  };
}
