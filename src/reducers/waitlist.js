import {
  INIT_STATE,
  WAITLIST_LOAD,
  WAITLIST_LOCK,
  WAITLIST_CLEAR,
  WAITLIST_UPDATE,
  WAITLIST_JOIN,
  WAITLIST_LEAVE,
} from '../constants/ActionTypes';

const initialState = {
  waitlist: [],
  locked: false,
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case INIT_STATE:
      return {
        ...state,
        waitlist: payload.waitlist,
        locked: payload.waitlistLocked,
      };
    case WAITLIST_LOAD:
      return {
        ...state,
        waitlist: payload.waitlist,
        locked: payload.locked,
      };
    case WAITLIST_LOCK:
      return {
        ...state,
        locked: payload.locked,
      };
    case WAITLIST_CLEAR:
      return {
        ...state,
        waitlist: [],
      };
    case WAITLIST_JOIN:
    case WAITLIST_LEAVE:
    case WAITLIST_UPDATE:
      return {
        ...state,
        waitlist: payload.waitlist,
      };
    default:
      return state;
  }
}
