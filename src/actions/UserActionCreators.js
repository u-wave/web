import { put } from './RequestActionCreators';
import {
  DO_CHANGE_USERNAME_START,
  DO_CHANGE_USERNAME_COMPLETE,
} from '../constants/ActionTypes';
import { currentUserSelector } from '../selectors/userSelectors';

export function doChangeUsername(username) {
  return (dispatch, getState) => {
    const user = currentUserSelector(getState());

    return dispatch(put(`/users/${user._id}/username`, { username }, {
      onStart: () => ({
        type: DO_CHANGE_USERNAME_START,
        payload: { username },
      }),
      onComplete: ({ data }) => ({
        type: DO_CHANGE_USERNAME_COMPLETE,
        payload: { username: data.username },
      }),
      onError: (error) => ({
        type: DO_CHANGE_USERNAME_COMPLETE,
        error: true,
        payload: error,
        meta: { username },
      }),
    }));
  };
}
