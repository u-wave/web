import { del, post, put } from './RequestActionCreators';
import {
  WAITLIST_LOAD,
  WAITLIST_LOCK,
  WAITLIST_CLEAR,
  WAITLIST_UPDATE,
  WAITLIST_JOIN,
  WAITLIST_LEAVE,
  WAITLIST_MOVE,
  DO_JOIN_START, DO_JOIN_COMPLETE,
  DO_LEAVE_START, DO_LEAVE_COMPLETE,
  DO_LOCK_START, DO_LOCK_COMPLETE,
  DO_CLEAR_START, DO_CLEAR_COMPLETE,
} from '../constants/ActionTypes';
import { currentUserSelector } from '../selectors/userSelectors';

export function setWaitList(data) {
  return {
    type: WAITLIST_LOAD,
    payload: {
      waitlist: data.waitlist,
      locked: data.locked,
    },
  };
}

export function setLocked(lock) {
  return {
    type: WAITLIST_LOCK,
    payload: {
      locked: lock,
    },
  };
}

export function clearWaitlist() {
  return { type: WAITLIST_CLEAR };
}

export function updatedWaitlist(waitlist) {
  return {
    type: WAITLIST_UPDATE,
    payload: { waitlist },
  };
}

// TODO split joining the waitlist and adding another user to the waitlist
// into two different actions.
export function joinWaitlist(otherUser) {
  return (dispatch, getState) => {
    const user = otherUser || currentUserSelector(getState());

    return dispatch(post('/waitlist', { userID: user._id }, {
      onStart: () => ({ type: DO_JOIN_START }),
      onComplete: ({ data }) => ({
        type: DO_JOIN_COMPLETE,
        payload: { waitlist: data },
      }),
      onError: error => ({
        type: DO_JOIN_COMPLETE,
        error: true,
        payload: error,
      }),
    }));
  };
}

export function joinedWaitlist({ userID, waitlist }) {
  return {
    type: WAITLIST_JOIN,
    payload: { userID, waitlist },
  };
}

export function leaveWaitlist(otherUser) {
  return (dispatch, getState) => {
    const user = otherUser || currentUserSelector(getState());

    return dispatch(del(`/waitlist/${user._id}`, {}, {
      onStart: () => ({ type: DO_LEAVE_START }),
      onComplete: ({ data }) => ({
        type: DO_LEAVE_COMPLETE,
        payload: { waitlist: data },
      }),
      onError: error => ({
        type: DO_LEAVE_COMPLETE,
        error: true,
        payload: error,
      }),
    }));
  };
}

export function leftWaitlist({ userID, waitlist }) {
  return {
    type: WAITLIST_LEAVE,
    payload: { userID, waitlist },
  };
}

export function movedInWaitlist({
  userID, moderatorID, position, waitlist,
}) {
  return (dispatch) => {
    dispatch({
      type: WAITLIST_MOVE,
      payload: { userID, position },
      meta: { moderatorID },
    });
    dispatch(updatedWaitlist(waitlist));
  };
}

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
    onError: error => ({
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
    onError: error => ({
      type: DO_CLEAR_COMPLETE,
      error: true,
      payload: error,
    }),
  });
}
