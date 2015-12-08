import { del, post, put } from '../utils/Request';

export function setWaitList(data) {
  return {
    type: 'loadedWaitlist',
    payload: {
      waitlist: data.waitlist,
      locked: data.locked
    }
  };
}

export function setLocked(lock) {
  return {
    type: 'lockWaitlist',
    payload: {
      locked: lock
    }
  };
}

export function clearWaitlist() {
  return { type: 'clearWaitlist' };
}

export function updatedWaitlist(waitlist) {
  return {
    type: 'updatedWaitlist',
    payload: { waitlist }
  };
}

export function joinWaitlist(user) {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;

    dispatch({ type: 'joiningWaitlist' });
    if (user) {
      // TODO don't post an object at all once the API server supports it
      post(jwt, '/v1/waitlist', { userID: user._id })
        .then(res => res.json())
        .then(waitlist => {
          dispatch({
            type: 'joinedWaitlistSelf',
            payload: { waitlist }
          });
        })
        .catch(error => {
          dispatch({
            type: 'joinedWaitlistSelf',
            error: true,
            payload: error
          });
        });
    }
  };
}

export function joinedWaitlist({ userID, waitlist }) {
  return {
    type: 'joinedWaitlist',
    payload: { userID, waitlist }
  };
}

export function leaveWaitlist(user) {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;

    if (user) {
      dispatch({ type: 'leavingWaitlist' });
      del(jwt, `/v1/waitlist/${user._id}`)
        .then(res => res.json())
        .then(waitlist => {
          dispatch({
            type: 'leftWaitlistSelf',
            payload: { waitlist }
          });
        })
        .catch(error => {
          dispatch({
            type: 'leftWaitlistSelf',
            error: true,
            payload: error
          });
        });
    }
  };
}

export function leftWaitlist({ userID, waitlist }) {
  return {
    type: 'leftWaitlist',
    payload: { userID, waitlist }
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
    const jwt = getState().auth.jwt;

    dispatch({
      type: 'modLockWaitlist',
      payload: { locked: status }
    });
    put(jwt, '/v1/waitlist/lock', { lock: status, clear: false })
      .then(res => res.json())
      .then(res => res.locked)
      .then(locked => {
        setLocked(locked);
        dispatch({
          type: 'modLockedWaitlist',
          payload: { locked }
        });
      })
      .catch(error => {
        dispatch({
          type: 'modLockedWaitlist',
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
    const jwt = getState().auth.jwt;

    dispatch({ type: 'modClearWaitlist' });
    del(jwt, '/v1/waitlist')
      .then(res => res.json())
      .then(() => {
        dispatch({ type: 'modClearedWaitlist' });
      })
      .catch(error => {
        dispatch({
          type: 'modClearWaitlist',
          error: true,
          payload: error
        });
      });
  };
}
