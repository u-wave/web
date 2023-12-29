import { del, put } from './RequestActionCreators';
import {
  DO_LOCK_START, DO_LOCK_COMPLETE,
  DO_CLEAR_START, DO_CLEAR_COMPLETE,
} from '../constants/ActionTypes';

function putLock(status) {
  return put('/waitlist/lock', { lock: status, clear: false }, {
    onStart: () => ({
      type: DO_LOCK_START,
      payload: { locked: status },
    }),
    onComplete: ({ data }) => ({
      type: DO_LOCK_COMPLETE,
      payload: { locked: data.locked },
    }),
    onError: (error) => ({
      type: DO_LOCK_COMPLETE,
      error: true,
      payload: error,
    }),
  });
}

export function modLockWaitlist() {
  return putLock(true);
}
export function modUnlockWaitlist() {
  return putLock(false);
}

export function modClearWaitlist() {
  return del('/waitlist', {}, {
    onStart: () => ({ type: DO_CLEAR_START }),
    onComplete: () => ({ type: DO_CLEAR_COMPLETE }),
    onError: (error) => ({
      type: DO_CLEAR_COMPLETE,
      error: true,
      payload: error,
    }),
  });
}
