import { SET_TIMER, OFFSET } from '../constants/actionTypes/time';

const initialState = {
  timer: 0,
  offset: 0,
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case SET_TIMER:
      return { ...state, timer: action.payload };
    case OFFSET:
      return { ...state, offset: action.payload };
    default:
      return state;
  }
}
