import { dispatch } from '../dispatcher';
import { del, post, put } from '../utils/Request';
import LoginStore from '../stores/LoginStore';
import WaitlistStore from '../stores/WaitlistStore';

export function setWaitList(data) {
  dispatch({
    type: 'loadedWaitlist',
    payload: {
      waitlist: data.waitlist,
      locked: data.locked
    }
  });
}

export function setLocked(lock) {
  dispatch({
    type: 'lockWaitlist',
    payload: {
      locked: lock
    }
  });
}

export function clearWaitlist() {
  dispatch({ type: 'clearWaitlist' });
}

export function joinWaitlist() {
  const user = LoginStore.getUser();
  const current = WaitlistStore.getSize();
  dispatch({ type: 'joiningWaitlist' });
  if (user) {
    // TODO don't post an object at all once the API server supports it
    post('/v1/waitlist', { userID: user._id, position: current })
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
}

export function joinedWaitlist({ userID, waitlist }) {
  dispatch({
    type: 'joinedWaitlist',
    payload: { userID, waitlist }
  });
}

export function leftWaitlist({ userID, waitlist }) {
  dispatch({
    type: 'leftWaitlist',
    payload: { userID, waitlist }
  });
}

export function modAdd({ userID, moderatorID, position, waitlist }) {
  dispatch({
    type: 'addToWaitlist',
    payload: {
      userID, moderatorID, position, waitlist
    }
  });
}

export function modMove({ userID, moderatorID, position, waitlist }) {
  dispatch({
    type: 'moveInWaitlist',
    payload: {
      userID, moderatorID, position, waitlist
    }
  });
}

export function modRemove({ userID, moderatorID, reason, waitlist }) {
  dispatch({
    type: 'removeFromWaitlist',
    payload: {
      userID, moderatorID, reason, waitlist
    }
  });
}

function putLock(status) {
  dispatch({
    type: 'modLockWaitlist',
    payload: { locked: status }
  });
  put('/v1/waitlist/lock', { lock: status, clear: false })
    .then(res => res.json())
    .get('locked').tap(setLocked)
    .then(locked => {
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
}

export function modLockWaitlist() {
  putLock(true);
}
export function modUnlockWaitlist() {
  putLock(false);
}

export function modClearWaitlist() {
  dispatch({ type: 'modClearWaitlist' });
  del('/v1/waitlist')
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
}
