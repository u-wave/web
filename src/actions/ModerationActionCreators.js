import { del, post, put } from './RequestActionCreators';
import { djSelector } from '../selectors/boothSelectors';
import {
  SKIP_DJ_START, SKIP_DJ_COMPLETE,
  MOVE_USER_START, MOVE_USER_COMPLETE,
  REMOVE_USER_START, REMOVE_USER_COMPLETE,
  MUTE_USER_START, MUTE_USER_COMPLETE,
  UNMUTE_USER_START, UNMUTE_USER_COMPLETE,
  BAN_USER_START, BAN_USER_COMPLETE,
  ADD_USER_ROLES_START, ADD_USER_ROLES_COMPLETE,
  REMOVE_USER_ROLES_START, REMOVE_USER_ROLES_COMPLETE,
} from '../constants/ActionTypes';
import { removeMessage, removeMessagesByUser, removeAllMessages } from './ChatActionCreators';

export function skipCurrentDJ(reason = '', shouldRemove = false) {
  return (dispatch, getState) => {
    const dj = djSelector(getState());
    if (!dj) {
      return null;
    }
    const payload = {
      userID: dj._id,
      reason,
      remove: shouldRemove,
    };
    return dispatch(post('/booth/skip', payload, {
      onStart: () => ({ type: SKIP_DJ_START, payload }),
      onComplete: () => ({ type: SKIP_DJ_COMPLETE, payload }),
      onError: error => ({
        type: SKIP_DJ_COMPLETE,
        error: true,
        payload: error,
        meta: payload,
      }),
    }));
  };
}

export function removeCurrentDJ(reason = '') {
  return skipCurrentDJ(reason, true);
}

export function removeWaitlistUserStart(user) {
  return {
    type: REMOVE_USER_START,
    payload: { user },
  };
}

export function removeWaitlistUserComplete(user) {
  return {
    type: REMOVE_USER_COMPLETE,
    payload: { user },
  };
}

export function removeWaitlistUser(user) {
  return (dispatch, getState) => {
    dispatch(removeWaitlistUserStart(user));

    const currentDJ = djSelector(getState());
    let promise;
    if (currentDJ && currentDJ._id === user._id) {
      promise = dispatch(removeCurrentDJ());
    } else {
      promise = dispatch(del(`/waitlist/${user._id}`));
    }

    return promise
      .then(() => dispatch(removeWaitlistUserComplete(user)))
      .catch(error => dispatch({
        type: REMOVE_USER_COMPLETE,
        error: true,
        payload: error,
      }));
  };
}

export function moveWaitlistUserStart(user, position) {
  return {
    type: MOVE_USER_START,
    payload: { user, position },
  };
}

export function moveWaitlistUserComplete(user, position) {
  return {
    type: MOVE_USER_COMPLETE,
    payload: { user, position },
  };
}

export function moveWaitlistUser(user, position) {
  return put('/waitlist/move', { userID: user._id, position }, {
    onStart: () => moveWaitlistUserStart(user, position),
    onComplete: () => moveWaitlistUserComplete(user, position),
    onError: error => ({
      type: MOVE_USER_COMPLETE,
      error: true,
      payload: error,
      meta: { user, position },
    }),
  });
}

export function addUserRole(user, role) {
  const userID = typeof user === 'object' ? user._id : user;
  return put(`/users/${userID}/roles/${role}`, {}, {
    onStart: () => ({
      type: ADD_USER_ROLES_START,
      payload: { user, roles: [role] },
    }),
    onComplete: () => ({
      type: ADD_USER_ROLES_COMPLETE,
      payload: { user, roles: [role] },
    }),
    onError: error => ({
      type: ADD_USER_ROLES_COMPLETE,
      error: true,
      payload: error,
      meta: { user, roles: [role] },
    }),
  });
}

export function removeUserRole(user, role) {
  const userID = typeof user === 'object' ? user._id : user;
  return del(`/users/${userID}/roles/${role}`, {}, {
    onStart: () => ({
      type: REMOVE_USER_ROLES_START,
      payload: { user, roles: [role] },
    }),
    onComplete: () => ({
      type: REMOVE_USER_ROLES_COMPLETE,
      payload: { user, roles: [role] },
    }),
    onError: error => ({
      type: REMOVE_USER_ROLES_COMPLETE,
      error: true,
      payload: error,
      meta: { user, roles: [role] },
    }),
  });
}

export function deleteChatMessage(id) {
  return del(`/chat/${id}`, {}, {
    onStart: () => removeMessage(id),
    onError: error => ({
      type: undefined,
      error: true,
      payload: error,
      meta: { id },
    }),
  });
}

export function deleteChatMessagesByUser(userID) {
  return del(`/chat/user/${userID}`, {}, {
    onComplete: () => removeMessagesByUser(userID),
    onError: error => ({
      type: undefined,
      error: true,
      payload: error,
      meta: { userID },
    }),
  });
}

export function deleteAllChatMessages() {
  return del('/chat', {}, {
    onComplete: removeAllMessages,
    onError: error => ({
      type: undefined,
      error: true,
      payload: error,
    }),
  });
}

export function muteUserStart(userID, duration) {
  return {
    type: MUTE_USER_START,
    payload: { userID, duration },
  };
}

export function muteUserComplete(userID, duration) {
  return {
    type: MUTE_USER_COMPLETE,
    payload: { userID, duration },
  };
}

/**
 * Mute a user in the chat. Defaults to 10 minutes.
 */
export function muteUser(user, duration = 10 * 60 * 1000) {
  const userID = typeof user === 'object' ? user._id : user;
  return post(`/users/${userID}/mute`, { time: duration }, {
    onStart: () => muteUserStart(userID, duration),
    onComplete: () => muteUserComplete(userID, duration),
    onError: error => ({
      type: MUTE_USER_COMPLETE,
      error: true,
      payload: error,
    }),
  });
}

export function unmuteUserStart(userID) {
  return {
    type: UNMUTE_USER_START,
    payload: { userID },
  };
}

export function unmuteUserComplete(userID) {
  return {
    type: UNMUTE_USER_COMPLETE,
    payload: { userID },
  };
}

export function unmuteUser(user) {
  const userID = typeof user === 'object' ? user._id : user;
  return del(`/users/${userID}/mute`, {}, {
    onStart: () => unmuteUserStart(userID),
    onComplete: () => unmuteUserComplete(userID),
    onError: error => ({
      type: UNMUTE_USER_COMPLETE,
      error: true,
      payload: error,
    }),
  });
}

export function banUserStart(userID, duration, permanent) {
  return {
    type: BAN_USER_START,
    payload: { userID, duration, permanent },
  };
}

export function banUserComplete(ban) {
  return {
    type: BAN_USER_COMPLETE,
    payload: ban,
  };
}

/**
 * Ban a user. Defaults to 24 hours.
 */
export function banUser(user, { duration = 24 * 60 * 60 * 1000, permanent = false }) {
  const userID = typeof user === 'object' ? user._id : user;
  return post('/bans', { userID, duration, permanent }, {
    onStart: () => banUserStart(userID, duration, permanent),
    onComplete: ({ data }) => banUserComplete(data),
    onError: error => ({
      type: BAN_USER_COMPLETE,
      error: true,
      payload: error,
    }),
  });
}
