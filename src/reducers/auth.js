import {
  REGISTER_COMPLETE,
  LOGIN_COMPLETE, SET_TOKEN,
  LOGOUT_COMPLETE
} from '../constants/actionTypes/auth';
import {
  DO_CHANGE_USERNAME_COMPLETE
} from '../constants/actionTypes/users';

const initialState = {
  jwt: null,
  user: null,
  error: null
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload, error: isError } = action;
  switch (type) {
  case SET_TOKEN:
    return {
      ...state,
      jwt: payload.jwt,
      user: null,
      error: null
    };
  case LOGIN_COMPLETE:
    return isError ? {
      ...state,
      jwt: null,
      user: null,
      error: payload
    } : {
      ...state,
      jwt: payload.jwt,
      user: payload.user,
      error: null
    };
  case REGISTER_COMPLETE:
    return {
      ...state,
      jwt: null,
      user: null,
      error: payload
    };
  case LOGOUT_COMPLETE:
    return initialState;
  case DO_CHANGE_USERNAME_COMPLETE:
    if (!isError && state.user) {
      return {
        ...state,
        user: {
          ...state.user,
          username: payload.username
        }
      };
    }
    return state;
  default:
    return state;
  }
}
