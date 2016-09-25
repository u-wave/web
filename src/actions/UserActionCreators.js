import {
  LOAD,
  JOIN,
  LEAVE,
  CHANGE_USERNAME,
  CHANGE_ROLE,

  RECEIVE_GUEST_COUNT,

  DO_CHANGE_USERNAME_START,
  DO_CHANGE_USERNAME_COMPLETE
} from '../constants/actionTypes/users';
import { currentUserSelector } from '../selectors/userSelectors';
import { put } from './RequestActionCreators';

export function setUsers(users) {
  return {
    type: LOAD,
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
    type: JOIN,
    payload: { user }
  };
}

export function leave(id) {
  return {
    type: LEAVE,
    payload: {
      userID: id
    }
  };
}

export function changeUsername(userID, username) {
  return {
    type: CHANGE_USERNAME,
    payload: { userID, username }
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
    payload: { userID, role }
  };
}
