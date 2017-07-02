import {
  LOAD_ONLINE_USERS,
  USER_JOIN,
  USER_LEAVE,
  CHANGE_USERNAME,
  CHANGE_ROLE,

  RECEIVE_GUEST_COUNT,

  DO_CHANGE_USERNAME_START,
  DO_CHANGE_USERNAME_COMPLETE
} from '../constants/actionTypes/users';
import {
  currentUserSelector,
  usersSelector
} from '../selectors/userSelectors';
import { put } from './RequestActionCreators';

export function setUsers(users) {
  return {
    type: LOAD_ONLINE_USERS,
    payload: { users }
  };
}

export function receiveGuestCount(guests) {
  return {
    type: RECEIVE_GUEST_COUNT,
    payload: { guests }
  };
}

export function join(user) {
  return {
    type: USER_JOIN,
    payload: {
      user,
      timestamp: Date.now()
    }
  };
}

export function leave(id) {
  return (dispatch, getState) => {
    const user = usersSelector(getState())[id];
    return dispatch({
      type: USER_LEAVE,
      payload: {
        user,
        userID: id,
        timestamp: Date.now()
      }
    });
  };
}

export function changeUsername(userID, username) {
  return (dispatch, getState) => {
    const user = usersSelector(getState())[userID];
    return dispatch({
      type: CHANGE_USERNAME,
      payload: {
        user,
        userID,
        username,
        timestamp: Date.now()
      }
    });
  };
}

export function doChangeUsername(username) {
  return (dispatch, getState) => {
    const user = currentUserSelector(getState());

    return dispatch(put(`/users/${user._id}/username`, { username }, {
      onStart: () => ({
        type: DO_CHANGE_USERNAME_START,
        payload: { username }
      }),
      onComplete: ({ data }) => ({
        type: DO_CHANGE_USERNAME_COMPLETE,
        payload: { username: data.username }
      }),
      onError: error => ({
        type: DO_CHANGE_USERNAME_COMPLETE,
        error: true,
        payload: error,
        meta: { username }
      })
    }));
  };
}

export function changeUserRole(userID, role) {
  return {
    type: CHANGE_ROLE,
    payload: {
      userID,
      role,
      timestamp: Date.now()
    }
  };
}
