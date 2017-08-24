import {
  SET_RESET_KEY,
  SET_RESET_SUCCESS
} from './constants';

export auth from '../reducers/auth';
export config from '../reducers/config';
export errors from '../reducers/errors';
export theme from '../reducers/theme';

export function passwordReset(state = {}, action = {}) {
  if (action.error) return state;

  switch (action.type) {
  case SET_RESET_KEY:
    return {
      ...state,
      key: action.payload
    };
  case SET_RESET_SUCCESS:
    return {
      ...state,
      success: true
    };

  default:
    return state;
  }
}
