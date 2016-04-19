import {
  LOAD,
  LOCK, CLEAR,
  UPDATE, JOIN, LEAVE, MOVE,
  DO_JOIN_START, DO_JOIN_COMPLETE,
  DO_LEAVE_START, DO_LEAVE_COMPLETE,
  DO_LOCK_START, DO_LOCK_COMPLETE,
  DO_CLEAR_START, DO_CLEAR_COMPLETE
} from '../constants/actionTypes/waitlist';
import { del, post, put } from './RequestActionCreators';

export function setWaitList(data) {
  return {
    type: LOAD,
    payload: {
      waitlist: data.waitlist,
      locked: data.locked
    }
  };
}

export function setLocked(lock) {
  return {
    type: LOCK,
    payload: {
      locked: lock
    }
  };
}

export function clearWaitlist() {
  return { type: CLEAR };
}

export function updatedWaitlist(waitlist) {
  return {
    type: UPDATE,
    payload: { waitlist }
  };
}

export function joinWaitlist(user) {
  return dispatch => {
    if (!user) {
      return null;
    }
    // TODO don't post an object at all once the API server supports it
    return dispatch(post('/waitlist', { userID: user._id }, {
      onStart: () => ({ type: DO_JOIN_START }),
      onComplete: waitlist => ({
        type: DO_JOIN_COMPLETE,
        payload: { waitlist }
      }),
      onError: error => ({
        type: DO_JOIN_COMPLETE,
        error: true,
        payload: error
      })
    }));
  };
}

export function joinedWaitlist({ userID, waitlist }) {
  return {
    type: JOIN,
    payload: { userID, waitlist }
  };
}

export function leaveWaitlist(user) {
  return dispatch => {
    if (!user) {
      return null;
    }
    return dispatch(del(`/waitlist/${user._id}`, {}, {
      onStart: () => ({ type: DO_LEAVE_START }),
      onComplete: waitlist => ({
        type: DO_LEAVE_COMPLETE,
        payload: { waitlist }
      }),
      onError: error => ({
        type: DO_LEAVE_COMPLETE,
        error: true,
        payload: error
      })
    }));
  };
}

export function leftWaitlist({ userID, waitlist }) {
  return {
    type: LEAVE,
    payload: { userID, waitlist }
  };
}

export function movedInWaitlist({ userID, moderatorID, position, waitlist }) {
  return dispatch => {
    dispatch({
      type: MOVE,
      payload: { userID, position },
      meta: { moderatorID }
    });
    dispatch(updatedWaitlist(waitlist));
  };
}

function putLock(status) {
  return put('/waitlist/lock', { lock: status, clear: false }, {
    onStart: () => ({
      type: DO_LOCK_START,
      payload: { locked: status }
    }),
    onComplete: res => ({
      type: DO_LOCK_COMPLETE,
      payload: { locked: res.locked }
    }),
    onError: error => ({
      type: DO_LOCK_COMPLETE,
      error: true,
      payload: error
    })
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
    onError: error => ({
      type: DO_CLEAR_COMPLETE,
      error: true,
      payload: error
    })
  });
}
