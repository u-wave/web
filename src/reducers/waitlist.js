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
      ...state,
      waitlist: payload.waitlist,
      locked: payload.locked
    };
  case LOCK:
    return {
      ...state,
      locked: payload.locked
    };
  case CLEAR:
    return {
      ...state,
      waitlist: []
    };
  case JOIN:
  case LEAVE:
  case UPDATE:
    return {
      ...state,
      waitlist: payload.waitlist
    };
  default:
    return state;
  }
}
