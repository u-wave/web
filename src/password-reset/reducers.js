import { SET_RESET_KEY } from './constants';

export auth from '../reducers/auth';
export config from '../reducers/config';
export theme from '../reducers/theme';

export function passwordReset(state = {}, action = {}) {
  switch (action.type) {
  case SET_RESET_KEY:
    return {
      ...state,
      key: action.payload
    };

  default:
    return state;
  }
}
