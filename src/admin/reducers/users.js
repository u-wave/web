import {
  SET_USERS_FILTER,
  LOAD_USERS_START,
  LOAD_USERS_COMPLETE,
} from '../constants/ActionTypes';

const initialState = {
  filter: null,
  currentPage: 0,
  totalPages: 0,
  totalUsers: 0,
  users: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS_FILTER:
      return {
        ...state,
        filter: action.payload.filter,
      };
    case LOAD_USERS_START:
      return state;
    case LOAD_USERS_COMPLETE:
      return {
        ...state,
        currentPage: action.payload.page,
        totalUsers: action.meta.results,
        totalPages: Math.ceil(action.meta.results / action.meta.pageSize),
        users: action.payload.users,
      };
    default:
      return state;
  }
}
