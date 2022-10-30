import {
  INIT_STATE,
  AUTH_STRATEGIES,
  RESET_PASSWORD_COMPLETE,
  REGISTER_COMPLETE,
  LOGIN_COMPLETE,
  SET_TOKEN,
  LOGOUT_COMPLETE,
} from '../constants/ActionTypes';

const initialState = {
  strategies: ['local'],
  token: null,
  user: null,
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload, error: isError } = action;
  switch (type) {
    case INIT_STATE:
      return {
        ...state,
        strategies: payload.authStrategies,
      };
    case AUTH_STRATEGIES:
      return {
        ...state,
        strategies: payload.strategies,
      };
    case RESET_PASSWORD_COMPLETE:
      return {
        ...state,
        token: payload.token,
        user: null,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: payload.token,
        user: null,
      };
    case LOGIN_COMPLETE:
      return isError ? {
        ...state,
        token: null,
        user: null,
      } : {
        ...state,
        token: payload.token,
        user: payload.user._id,
      };
    case REGISTER_COMPLETE:
      return {
        ...state,
        token: null,
        user: null,
      };
    case LOGOUT_COMPLETE:
      return initialState;
    default:
      return state;
  }
}
