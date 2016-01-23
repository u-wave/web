import {
  LOAD, JOIN, LEAVE, CHANGE_USERNAME,
  DO_CHANGE_USERNAME_START, DO_CHANGE_USERNAME_COMPLETE
} from '../constants/actionTypes/users';
import { tokenSelector, currentUserSelector } from '../selectors/userSelectors';
import { put } from '../utils/Request';

export function setUsers(users) {
  return {
    type: LOAD,
    payload: { users }
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
    const jwt = tokenSelector(getState());
    const user = currentUserSelector(getState());

    dispatch({
      type: DO_CHANGE_USERNAME_START,
      payload: { username }
    });

    put(jwt, `/v1/users/${user._id}/username`, { username })
      .then(res => res.json())
      .then(updated => dispatch({
        type: DO_CHANGE_USERNAME_COMPLETE,
        payload: { username: updated.username }
      }))
      .catch(error => dispatch({
        type: DO_CHANGE_USERNAME_COMPLETE,
        error: true,
        payload: error,
        meta: { username }
      }));
  };
}
