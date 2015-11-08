import { dispatch } from '../dispatcher';

export function setUsers(users) {
  dispatch({
    type: 'setUsers',
    payload: { users }
  });
}

export function join(user) {
  dispatch({
    type: 'join',
    payload: { user }
  });
}

export function leave(id) {
  dispatch({
    type: 'leave',
    payload: {
      userID: id
    }
  });
}
