import compose from 'fj-compose';

import { TICK } from '../constants/actionTypes/time';

export function tick() {
  return {
    type: TICK,
    payload: 1
  };
}

export function startTicking() {
  return dispatch => setInterval(compose(dispatch, tick), 1000);
}
