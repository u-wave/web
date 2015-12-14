import { LOAD, JOIN, LEAVE } from '../constants/actionTypes/users';

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
