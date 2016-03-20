import {
  LOAD,
  LOCK, CLEAR,
  UPDATE, JOIN, LEAVE, MOVE,
  DO_JOIN_START, DO_JOIN_COMPLETE,
  DO_LEAVE_START, DO_LEAVE_COMPLETE,
  DO_LOCK_START, DO_LOCK_COMPLETE,
  DO_CLEAR_START, DO_CLEAR_COMPLETE
} from '../constants/actionTypes/waitlist';
import { del, post, put } from '../utils/Request';
import { tokenSelector } from '../selectors/userSelectors';

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
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());

    dispatch({ type: DO_JOIN_START });
    if (user) {
      // TODO don't post an object at all once the API server supports it
      post(jwt, '/v1/waitlist', { userID: user._id })
        .then(res => res.json())
        .then(waitlist => {
          dispatch({
            type: DO_JOIN_COMPLETE,
            payload: { waitlist }
          });
        })
        .catch(error => {
          dispatch({
            type: DO_JOIN_COMPLETE,
            error: true,
            payload: error
          });
        });
    }
  };
}

export function joinedWaitlist({ userID, waitlist }) {
  return {
    type: JOIN,
    payload: { userID, waitlist }
  };
}

export function leaveWaitlist(user) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());

    if (user) {
      dispatch({ type: DO_LEAVE_START });
      del(jwt, `/v1/waitlist/${user._id}`)
        .then(res => res.json())
        .then(waitlist => {
          dispatch({
            type: DO_LEAVE_COMPLETE,
            payload: { waitlist }
          });
        })
        .catch(error => {
          dispatch({
            type: DO_LEAVE_COMPLETE,
            error: true,
            payload: error
          });
        });
    }
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

export function modAdd({ userID, moderatorID, position, waitlist }) {
  return {
    type: 'addToWaitlist',
    payload: {
      userID, moderatorID, position, waitlist
    }
  };
}

export function modMove({ userID, moderatorID, position, waitlist }) {
  return {
    type: 'moveInWaitlist',
    payload: {
      userID, moderatorID, position, waitlist
    }
  };
}

export function modRemove({ userID, moderatorID, reason, waitlist }) {
  return {
    type: 'removeFromWaitlist',
    payload: {
      userID, moderatorID, reason, waitlist
    }
  };
}

function putLock(status) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());

    dispatch({
      type: DO_LOCK_START,
      payload: { locked: status }
    });
    put(jwt, '/v1/waitlist/lock', { lock: status, clear: false })
      .then(res => res.json())
      .then(res => res.locked)
      .then(locked => {
        setLocked(locked);
        dispatch({
          type: DO_LOCK_COMPLETE,
          payload: { locked }
        });
      })
      .catch(error => {
        dispatch({
          type: DO_LOCK_COMPLETE,
          error: true,
          payload: error
        });
      });
  };
}

export function modLockWaitlist() {
  return putLock(true);
}
export function modUnlockWaitlist() {
  return putLock(false);
}

export function modClearWaitlist() {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());

    dispatch({ type: DO_CLEAR_START });
    del(jwt, '/v1/waitlist')
      .then(res => res.json())
      .then(() => {
        dispatch({ type: DO_CLEAR_COMPLETE });
      })
      .catch(error => {
        dispatch({
          type: DO_CLEAR_COMPLETE,
          error: true,
          payload: error
        });
      });
  };
}
