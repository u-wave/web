import except from 'except';
import indexBy from 'index-by';
import { combineReducers } from 'redux';

import {
  INIT_STATE
} from '../constants/actionTypes/auth';
import {
  LOAD_ONLINE_USERS,
  USER_JOIN,
  USER_LEAVE,
  CHANGE_USERNAME,
  CHANGE_ROLE,

  RECEIVE_GUEST_COUNT
} from '../constants/actionTypes/users';

function guestsReducer(state = 0, action = {}) {
  if (action.type === INIT_STATE) {
    return action.payload.guests;
  }
  if (action.type === RECEIVE_GUEST_COUNT) {
    return action.payload.guests;
  }
  return state;
}

function usersReducer(state = {}, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case LOAD_ONLINE_USERS:
    // this is merged in instead of replacing the state, because sometimes the
    // JOIN event from the current user comes in before the LOAD event, and then
    // the current user is sometimes excluded from the state. it looks like this
    // approach could cause problems, too, though.
    // TODO maybe replace state instead anyway and merge in the current user?
    return {
      ...state,
      ...indexBy(payload.users, '_id')
    };
  case USER_JOIN:
    return {
      ...state,
      [payload.user._id]: payload.user
    };
  case USER_LEAVE:
    return except(state, payload.userID);
  case CHANGE_USERNAME:
    if (state[payload.userID]) {
      return {
        ...state,
        [payload.userID]: {
          ...state[payload.userID],
          username: payload.username
        }
      };
    }
    return state;
  case CHANGE_ROLE:
    if (state[payload.userID]) {
      return {
        ...state,
        [payload.userID]: {
          ...state[payload.userID],
          role: payload.role
        }
      };
    }
    return state;
  default:
    return state;
  }
}

const reduce = combineReducers({
  guests: guestsReducer,
  users: usersReducer
});

export default reduce;
