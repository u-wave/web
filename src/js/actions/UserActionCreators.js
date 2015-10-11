import { dispatch } from '../dispatcher';

export function setUsers(users) {
  dispatch({
    action: 'setUsers',
    users
  });
}

export function join(user) {
  dispatch({
    action: 'join',
    user
  });
}

export function leave(id) {
  dispatch({
    action: 'leave',
    userID: id
  });
}
