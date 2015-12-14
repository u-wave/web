import {
  LOAD,
  LOCK, CLEAR,
  UPDATE, JOIN, LEAVE
} from '../constants/actionTypes/waitlist';

const initialState = {
  waitlist: [],
  locked: false
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case LOAD:
    return {
      waitlist: payload.waitlist,
      locked: payload.locked,
      ...state
    };
  case LOCK:
    return {
      locked: payload.locked,
      ...state
    };
  case CLEAR:
    return {
      waitlist: [],
      ...state
    };
  case JOIN:
  case LEAVE:
  case 'waitlistAdd':
  case 'waitlistRemove':
  case 'waitlistMove':
  case UPDATE:
    return {
      waitlist: payload.waitlist,
      ...state
    };
  default:
    return state;
  }
}
