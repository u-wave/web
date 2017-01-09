import { get } from '../../actions/RequestActionCreators';
import { LOAD_USERS_START, LOAD_USERS_COMPLETE } from '../constants/ActionTypes';

export function loadUsersStart() {
  return { type: LOAD_USERS_START };
}

export function loadUsersComplete(response) {
  return {
    type: LOAD_USERS_COMPLETE,
    payload: { users: response.data }
  };
}

export function loadUsers() {
  return get('users', {
    onStart: loadUsersStart,
    onComplete: loadUsersComplete
  });
}
