import omit from 'just-omit';
import { AnyAction, combineReducers } from 'redux';
import indexBy from 'just-index';
import {
  INIT_STATE,
  LOAD_ONLINE_USERS,
  USER_JOIN,
  USER_LEAVE,
  CHANGE_USERNAME,
  USER_ADD_ROLES,
  USER_REMOVE_ROLES,
  RECEIVE_GUEST_COUNT,
} from '../constants/ActionTypes';

export interface User {
  _id: string;
  username: string;
  avatar: string;
  roles: string[];
}

type State = Record<string, User>;
const initialState: State = {};

function updateUser(state: State, userID: string, update: (user: User) => User) {
  if (state[userID]) {
    return {
      ...state,
      [userID]: update(state[userID]),
    };
  }
  return state;
}

function guestsReducer(state = 0, action: AnyAction): number {
  if (action.type === INIT_STATE) {
    return action.payload.guests;
  }
  if (action.type === RECEIVE_GUEST_COUNT) {
    return action.payload.guests;
  }
  return state;
}

function usersReducer(state = initialState, action: AnyAction): State {
  const { type, payload } = action;
  switch (type) {
    case INIT_STATE: // fall through
    case LOAD_ONLINE_USERS:
    // this is merged in instead of replacing the state, because sometimes the
    // JOIN event from the current user comes in before the LOAD event, and then
    // the current user is sometimes excluded from the state. it looks like this
    // approach could cause problems, too, though.
    // TODO maybe replace state instead anyway and merge in the current user?
      return {
        ...state,
        ...indexBy(payload.users, '_id'),
      };
    case USER_JOIN:
      return {
        ...state,
        [payload.user._id]: payload.user,
      };
    case USER_LEAVE:
      return omit(state, payload.userID);
    case CHANGE_USERNAME:
      return updateUser(state, payload.userID, (user) => ({
        ...user,
        username: payload.username,
      }));
    case USER_ADD_ROLES:
      return updateUser(state, payload.userID, (user) => ({
        ...user,
        roles: [...user.roles, ...payload.roles],
      }));
    case USER_REMOVE_ROLES:
      return updateUser(state, payload.userID, (user) => ({
        ...user,
        roles: user.roles.filter((role) => !payload.roles.includes(role)),
      }));
    default:
      return state;
  }
}

const reduce = combineReducers({
  guests: guestsReducer,
  users: usersReducer,
});

export default reduce;
