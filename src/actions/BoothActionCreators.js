import {
  ADVANCE,
  LOAD_HISTORY_START, LOAD_HISTORY_COMPLETE
} from '../constants/actionTypes/booth';
import { flattenPlaylistItem } from './PlaylistActionCreators';
import { get } from '../utils/Request';

import { usersSelector } from '../selectors/userSelectors';

/**
 * Set the current song and DJ.
 */
export function advance(nextBooth) {
  if (!nextBooth) {
    return {
      type: ADVANCE,
      payload: null
    };
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

export function loadHistory() {
  return dispatch => {
    dispatch({ type: LOAD_HISTORY_START });
    get(null, '/v1/booth/history')
      .then(res => res.json())
      .then(history => {
        dispatch({
          type: LOAD_HISTORY_COMPLETE,
          payload: history.result,
          meta: {
            page: history.page,
            size: history.size
          }
        });
      });
  };
}
