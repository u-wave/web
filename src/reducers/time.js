import { TICK, OFFSET } from '../constants/actionTypes/time';

const initialState = {
  time: 0,
  offset: 0
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
  case TICK:
    return { ...state, time: action.payload };
  case OFFSET:
    return { ...state, offset: action.payload };
  default:
    return state;
  }
}
