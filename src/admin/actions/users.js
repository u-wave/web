import { get } from '../../actions/RequestActionCreators';
import { LOAD_USERS_START, LOAD_USERS_COMPLETE } from '../constants/ActionTypes';

export function loadUsersStart() {
  return { type: LOAD_USERS_START };
}

export function loadUsersComplete(response) {
  return {
    type: LOAD_USERS_COMPLETE,
    payload: {
      users: response.data,
      page: Math.floor(response.meta.offset / response.meta.pageSize),
    },
    meta: response.meta,
  };
}

export function loadUsers(pagination = null) {
  return get('/users', {
    qs: pagination ? { page: pagination } : null,
    onStart: loadUsersStart,
    onComplete: loadUsersComplete,
  });
}
