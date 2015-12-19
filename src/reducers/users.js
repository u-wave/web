import except from 'except';
import indexBy from 'index-by';

import { LOAD, JOIN, LEAVE } from '../constants/actionTypes/users';

const initialState = {};

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case LOAD:
    // this is merged in instead of replacing the state, because sometimes the
    // JOIN event from the current user comes in before the LOAD event, and then
    // the current user is sometimes excluded from the state. it looks like this
    // approach could cause problems, too, though.
    // TODO maybe replace state instead anyway and merge in the current user?
    return {
      ...state,
      ...indexBy(payload.users, '_id')
    };
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
