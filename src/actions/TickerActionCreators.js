import { get } from './RequestActionCreators';

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
  const before = Date.now();
  return get('/server/time', {
    onComplete: serverTime => syncTimestamps(before, serverTime)
  });
}

export function startTicking() {
  return dispatch => {
    dispatch(tick());
    setInterval(() => dispatch(tick()), 1000);
  };
}
