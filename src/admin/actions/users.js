import { get } from '../../actions/RequestActionCreators';
import {
  SET_USERS_FILTER,
  LOAD_USERS_START,
  LOAD_USERS_COMPLETE,
} from '../constants/ActionTypes';
import { filterSelector } from '../selectors/userSelectors';

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
  return (dispatch, getState) => {
    const filter = filterSelector(getState());

    const qs = {};
    if (pagination) qs.page = pagination;
    if (filter) qs.filter = filter;

    return dispatch(get('/users', {
      qs,
      onStart: loadUsersStart,
      onComplete: loadUsersComplete,
    }));
  };
}

export function setUsersFilter(filter = null) {
  return {
    type: SET_USERS_FILTER,
    payload: { filter },
  };
}
