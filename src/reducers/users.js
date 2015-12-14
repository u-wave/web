import except from 'except';
import indexBy from 'index-by';

import { LOAD, JOIN, LEAVE } from '../constants/actionTypes/users';

const initialState = {};

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case LOAD:
    return indexBy(payload.users, '_id');
  case JOIN:
    return {
      ...state,
      [payload.user._id]: payload.user
    };
  case LEAVE:
    return except(state, payload.userID);
  default:
    return state;
  }
}
