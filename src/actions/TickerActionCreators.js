import { get } from './RequestActionCreators';

import { SET_TIMER, OFFSET } from '../constants/actionTypes/time';
import { timerSelector } from '../selectors/timeSelectors';

export function syncTimestamps(clientTimeBefore, serverTime) {
  const clientTimeAfter = Date.now();
  return {
    type: OFFSET,
    payload: Math.round(((serverTime - clientTimeBefore) + (serverTime - clientTimeAfter)) / 2),
  };
}

export function sync() {
  const before = Date.now();
  return get('/now', {
    onComplete: now => syncTimestamps(before, now.time),
  });
}

export function createTimer() {
  return (dispatch) => {
    const callbacks = [];
    let last = Date.now();
    let syncing = false;

    function notifyListeners() {
      callbacks.forEach(cb => cb());
    }
    function finishedSync() {
      syncing = false;
      notifyListeners();
    }

    const intv = setInterval(() => {
      // Resync if one 1000ms interval skipped over more than 5s of time.
      // This most likely means the user's computer's time changed.
      const now = Date.now();
      if (Math.abs(last - now) > 5000) {
        syncing = true;
        dispatch(sync()).then(finishedSync, finishedSync);
      } else if (!syncing) {
        // If we're currently syncing we don't update timed elements for
        // a while, to prevent weird back and forth jumps.
        notifyListeners();
      }
      last = now;
    }, 1000);

    dispatch({
      type: SET_TIMER,
      payload: intv,
    });

    return callbacks;
  };
}

export function stopTimer() {
  return (dispatch, getState) => {
    const timer = timerSelector(getState());
    clearInterval(timer);
    dispatch({
      type: SET_TIMER,
      payload: null,
    });
  };
}
