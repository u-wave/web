import {
  ADVANCE,
  LOAD_HISTORY_START, LOAD_HISTORY_COMPLETE
} from '../constants/actionTypes/booth';
import { flattenPlaylistItem } from './PlaylistActionCreators';
import { get } from '../utils/Request';

import { usersSelector } from '../selectors/userSelectors';

export function advanceToEmpty() {
  return {
    type: ADVANCE,
    payload: null
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
      }
    });
  };
}

export function loadHistoryStart() {
  return { type: LOAD_HISTORY_START };
}

export function loadHistoryComplete({ result, page, size }) {
  return {
    type: LOAD_HISTORY_COMPLETE,
    payload: result,
    meta: { page, size }
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
