import { del, post } from '../utils/Request';
import { djSelector } from '../selectors/boothSelectors';
import { tokenSelector } from '../selectors/userSelectors';

import {
  SKIP_DJ_START, SKIP_DJ_COMPLETE
} from '../constants/actionTypes/moderation';

import {
  removeMessage, removeMessagesByUser, removeAllMessages
} from './ChatActionCreators';

export function skipCurrentDJ(reason = '') {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    const dj = djSelector(getState());
    if (!dj) {
      return;
    }
    const payload = { userID: dj._id, reason };
    dispatch({
      type: SKIP_DJ_START,
      payload
    });
    post(jwt, `/v1/booth/skip`, payload)
      .then(res => res.json())
      .then(() => dispatch({
        type: SKIP_DJ_COMPLETE,
        payload
      }))
      .catch(error => dispatch({
        type: SKIP_DJ_COMPLETE,
        error: true,
        payload: error,
        meta: payload
      }));
  };
}

export function deleteChatMessage(id) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    del(jwt, `/v1/chat/${id}`)
      .then(res => res.json())
      .then(() => dispatch(removeMessage(id)))
      .catch(error => dispatch({
        type: undefined,
        error: true,
        payload: error,
        meta: { id }
      }));
  };
}

export function deleteChatMessagesByUser(userID) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    del(jwt, `/v1/chat/user/${userID}`)
      .then(res => res.json())
      .then(() => dispatch(removeMessagesByUser(userID)))
      .catch(error => dispatch({
        type: undefined,
        error: true,
        payload: error,
        meta: { userID }
      }));
  };
}

export function deleteAllChatMessages() {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    del(jwt, `/v1/chat`)
      .then(res => res.json())
      .then(() => dispatch(removeAllMessages()))
      .catch(error => dispatch({
        type: undefined,
        error: true,
        payload: error
      }));
  };
}
