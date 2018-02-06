import {
  RESET_PASSWORD_COMPLETE,
  REGISTER_COMPLETE,
  LOGIN_COMPLETE, SET_TOKEN,
  LOGOUT_COMPLETE
} from '../constants/actionTypes/auth';
import {
  DO_CHANGE_USERNAME_COMPLETE
} from '../constants/actionTypes/users';

const initialState = {
  token: null,
  user: null,
  error: null
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload, error: isError } = action;
  switch (type) {
  case RESET_PASSWORD_COMPLETE:
    return isError ? {
      ...state,
      token: payload.token,
      user: null,
      error: payload
    } : {
      ...state,
      token: payload.token,
      user: null,
      error: null
    };
  case SET_TOKEN:
    return {
      ...state,
      token: payload.token,
      user: null,
      error: null
    };
  case LOGIN_COMPLETE:
    return isError ? {
      ...state,
      token: null,
      user: null,
      error: payload
    } : {
      ...state,
      token: payload.token,
      user: payload.user,
      error: null
    };
  case REGISTER_COMPLETE:
    return {
      ...state,
      token: null,
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
