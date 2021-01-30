import {
  SET_RESET_KEY,
  SET_RESET_SUCCESS,
} from './constants';
import auth from '../reducers/auth';
import config from '../reducers/config';
import errors from '../reducers/errors';
import theme from '../reducers/theme';

export {
  auth,
  config,
  errors,
  theme,
};

export function passwordReset(state = {}, action = {}) {
  if (action.error) return state;

  switch (action.type) {
    case SET_RESET_KEY:
      return {
        ...state,
        key: action.payload,
      };
    case SET_RESET_SUCCESS:
      return {
        ...state,
        success: true,
      };

    default:
      return state;
  }
}
