import {
  SET_RESET_KEY,
  SET_RESET_SUCCESS,
} from './constants';
import { post } from '../actions/RequestActionCreators';

export function setResetKey(key) {
  return {
    type: SET_RESET_KEY,
    payload: key,
  };
}

export function resetPasswordComplete() {
  return { type: SET_RESET_SUCCESS };
}

export function resetPassword(newPassword) {
  return (dispatch, getState) => {
    const { key } = getState().passwordReset;

    return dispatch(post(`/auth/password/reset/${key}`, { password: newPassword }, {
      onComplete: resetPasswordComplete,
      onError: err => ({
        type: SET_RESET_SUCCESS,
        error: true,
        payload: err,
      }),
    }));
  };
}
