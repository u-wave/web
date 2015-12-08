export function setUsers(users) {
  return {
    type: 'setUsers',
    payload: { users }
  };
}

export function join(user) {
  return {
    type: 'join',
    payload: { user }
  };
}

export function leave(id) {
  return {
    type: 'leave',
    payload: {
      userID: id
    }
  };
}
