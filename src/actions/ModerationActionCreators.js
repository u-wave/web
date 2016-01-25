import { post } from '../utils/Request';
import { djSelector } from '../selectors/boothSelectors';
import { tokenSelector } from '../selectors/userSelectors';

import {
  SKIP_DJ_START, SKIP_DJ_COMPLETE
} from '../constants/actionTypes/moderation';

export function skipCurrentDJ(reason = '') {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    const dj = djSelector(getState());
    if (!dj) {
      return;
    }
    const payload = { userID: dj._id, reason };
    dispatch({
      type: SKIP_DJ_START,
      payload
    });
    post(jwt, `/v1/booth/skip`, payload)
      .then(res => res.json())
      .then(() => dispatch({
        type: SKIP_DJ_COMPLETE,
        payload
      }))
      .catch(error => dispatch({
        type: SKIP_DJ_COMPLETE,
        error: true,
        payload: error,
        meta: payload
      }));
  };
}
