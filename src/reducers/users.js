import except from 'except';
import indexBy from 'index-by';

const initialState = {};

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case 'setUsers':
    return indexBy(payload.users, '_id');
  case 'join':
    return {
      ...state,
      [payload.user._id]: payload.user
    };
  case 'leave':
    return except(state, payload.userID);
  default:
    return state;
  }
}
