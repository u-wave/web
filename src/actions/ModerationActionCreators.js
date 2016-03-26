import { del, post, put } from '../utils/Request';
import { djSelector } from '../selectors/boothSelectors';
import { tokenSelector } from '../selectors/userSelectors';

import {
  SKIP_DJ_START, SKIP_DJ_COMPLETE,
  MOVE_USER_START, MOVE_USER_COMPLETE,
  REMOVE_USER_START, REMOVE_USER_COMPLETE,
  MUTE_USER_START, MUTE_USER_COMPLETE,
  UNMUTE_USER_START, UNMUTE_USER_COMPLETE,
  SET_USER_ROLE_START, SET_USER_ROLE_COMPLETE
} from '../constants/actionTypes/moderation';

import {
  removeMessage, removeMessagesByUser, removeAllMessages
} from './ChatActionCreators';

export function skipCurrentDJ(reason = '', shouldRemove = false) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    const dj = djSelector(getState());
    if (!dj) {
      return null;
    }
    const payload = {
      userID: dj._id,
      reason,
      remove: shouldRemove
    };
    dispatch({
      type: SKIP_DJ_START,
      payload
    });
    return post(jwt, `/v1/booth/skip`, payload)
      .then(res => res.json())
      .then(() => dispatch({
        type: SKIP_DJ_COMPLETE,
        payload
      }))
      .catch(error => dispatch({
        type: SKIP_DJ_COMPLETE,
        error: true,
        payload: error,
        meta: payload
      }));
  };
}

export function removeCurrentDJ(reason = '') {
  return skipCurrentDJ(reason, true);
}

export function removeWaitlistUserStart(user) {
  return {
    type: REMOVE_USER_START,
    payload: { user }
  };
}

export function removeWaitlistUserComplete(user) {
  return {
    type: REMOVE_USER_COMPLETE,
    payload: { user }
  };
}

export function removeWaitlistUser(user) {
  return (dispatch, getState) => {
    dispatch(removeWaitlistUserStart(user));

    const jwt = tokenSelector(getState());
    const currentDJ = djSelector(getState());
    let promise;
    if (currentDJ && currentDJ._id === user._id) {
      promise = dispatch(removeCurrentDJ());
    } else {
      promise = del(jwt, `/v1/waitlist/${user._id}`)
        .then(res => res.json());
    }

    return promise
      .then(() => dispatch(removeWaitlistUserComplete(user)))
      .catch(error => dispatch({
        type: REMOVE_USER_COMPLETE,
        error: true,
        payload: error
      }));
  };
}

export function moveWaitlistUserStart(user, position) {
  return {
    type: MOVE_USER_START,
    payload: { user, position }
  };
}

export function moveWaitlistUserComplete(user, position) {
  return {
    type: MOVE_USER_COMPLETE,
    payload: { user, position }
  };
}

export function moveWaitlistUser(user, position) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    dispatch(moveWaitlistUserStart(user, position));
    put(jwt, `/v1/waitlist/move`, { userID: user._id, position })
      .then(res => res.json())
      .then(() => dispatch(moveWaitlistUserComplete(user, position)))
      .catch(error => dispatch({
        type: MOVE_USER_COMPLETE,
        error: true,
        payload: error,
        meta: { user, position }
      }));
  };
}

export function setUserRoleStart(user, role) {
  return {
    type: SET_USER_ROLE_START,
    payload: { user, role }
  };
}

export function setUserRoleComplete(user, role) {
  return {
    type: SET_USER_ROLE_COMPLETE,
    payload: { user, role }
  };
}

export function setUserRole(user, role) {
  const userID = typeof user === 'object' ? user._id : user;
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    dispatch(setUserRoleStart(user, role));
    return put(jwt, `/v1/users/${userID}/role`, { role })
      .then(res => res.json())
      .then(() => dispatch(setUserRoleComplete(user, role)))
      .catch(error => dispatch({
        type: SET_USER_ROLE_COMPLETE,
        error: true,
        payload: error,
        meta: { user, role }
      }));
  };
}

export function deleteChatMessage(id) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    del(jwt, `/v1/chat/${id}`)
      .then(res => res.json())
      .then(() => dispatch(removeMessage(id)))
      .catch(error => dispatch({
        type: undefined,
        error: true,
        payload: error,
        meta: { id }
      }));
  };
}

export function deleteChatMessagesByUser(userID) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    del(jwt, `/v1/chat/user/${userID}`)
      .then(res => res.json())
      .then(() => dispatch(removeMessagesByUser(userID)))
      .catch(error => dispatch({
        type: undefined,
        error: true,
        payload: error,
        meta: { userID }
      }));
  };
}

export function deleteAllChatMessages() {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    del(jwt, `/v1/chat`)
      .then(res => res.json())
      .then(() => dispatch(removeAllMessages()))
      .catch(error => dispatch({
        type: undefined,
        error: true,
        payload: error
      }));
  };
}

export function muteUserStart(userID, duration) {
  return {
    type: MUTE_USER_START,
    payload: { userID, duration }
  };
}

export function muteUserComplete(userID, duration) {
  return {
    type: MUTE_USER_COMPLETE,
    payload: { userID, duration }
  };
}

/**
 * Mute a user in the chat. Defaults to 10 minutes.
 */
export function muteUser(user, duration = 10 * 60 * 1000) {
  const userID = typeof user === 'object' ? user._id : user;
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    dispatch(muteUserStart(userID, duration));
    return post(jwt, `/v1/users/${userID}/mute`, { time: duration })
      .then(res => res.json())
      .then(() => dispatch(
        muteUserComplete(userID, duration)
      ))
      .catch(error => dispatch({
        type: MUTE_USER_COMPLETE,
        error: true,
        payload: error
      }));
  };
}

export function unmuteUserStart(userID) {
  return {
    type: UNMUTE_USER_START,
    payload: { userID }
  };
}

export function unmuteUserComplete(userID) {
  return {
    type: UNMUTE_USER_COMPLETE,
    payload: { userID }
  };
}

export function unmuteUser(user) {
  const userID = typeof user === 'object' ? user._id : user;
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    return del(jwt, `/v1/users/${userID}/mute`)
      .then(res => res.json())
      .then(() => dispatch(unmuteUserComplete(userID)))
      .catch(error => dispatch({
        type: UNMUTE_USER_COMPLETE,
        error: true,
        payload: error
      }));
  };
}
