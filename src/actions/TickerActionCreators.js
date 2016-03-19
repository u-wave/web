import { get } from '../utils/Request';

import { TICK, OFFSET } from '../constants/actionTypes/time';

export function tick() {
  return {
    type: TICK,
    payload: Date.now()
  };
}

export function syncTimestamps(clientTimeBefore, serverTime) {
  const clientTimeAfter = Date.now();
  return {
    type: OFFSET,
    payload: Math.round(((serverTime - clientTimeBefore) + (serverTime - clientTimeAfter)) / 2)
  };
}

export function sync() {
  return dispatch => {
    const before = Date.now();
    return get(null, '/v1/server/time')
      .then(res => res.json())
      .then(serverTime => syncTimestamps(before, serverTime))
      .then(dispatch);
  };
}

export function startTicking() {
  return dispatch => {
    dispatch(tick());
    setInterval(() => dispatch(tick()), 1000);
  };
}
