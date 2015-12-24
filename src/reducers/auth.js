import {
  OPEN_LOGIN_DIALOG,
  REGISTER_COMPLETE,
  LOGIN_COMPLETE, SET_TOKEN,
  LOGOUT_COMPLETE
} from '../constants/actionTypes/auth';

const initialState = {
  jwt: null,
  user: null,
  error: null,
  modal: {
    open: false,
    show: 'login'
  }
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload, meta, error: isError } = action;
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
      error: null,
      modal: {
        ...state.modal,
        open: false
      }
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
  case OPEN_LOGIN_DIALOG:
    return {
      ...state,
      modal: {
        ...state.modal,
        open: true,
        show: meta.register ? 'register' : 'login'
      }
    };
  default:
    return state;
  }
}

export const getToken = state => state.auth.jwt;
export const getUser = state => state.auth.user;
