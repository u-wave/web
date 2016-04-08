import { get } from './RequestActionCreators';

import { SET_TIMER, OFFSET } from '../constants/actionTypes/time';

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

export function createTimer() {
  return dispatch => {
    const callbacks = [];
    const intv = setInterval(() => {
      callbacks.forEach(cb => cb());
    }, 1000);
    dispatch({
      type: SET_TIMER,
      payload: intv
    });
    return callbacks;
  };
}
