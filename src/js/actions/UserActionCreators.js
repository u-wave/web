import dispatcher from '../dispatcher';

export function join(user) {
  dispatcher.dispatch({
    action: 'join',
    user: user
  });
}

export function leave(id) {
  dispatcher.dispatch({
    action: 'leave',
    userID: id
  });
}
