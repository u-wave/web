import { SET_RESET_KEY } from './constants';
import { post } from '../actions/RequestActionCreators';

export function setResetKey(key) {
  return {
    type: SET_RESET_KEY,
    payload: key
  };
}

export function resetPassword(newPassword) {
  return (dispatch, getState) => {
    const { key } = getState().passwordReset;

    dispatch(post(`/auth/password/reset/${key}`, {
      email: null,
      password: newPassword
    }, {
      onComplete(result) {
        console.log(result);
      }
    }));
  };
}
