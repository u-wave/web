import { TICK } from '../constants/actionTypes/time';

const initialState = 0;

export default function reduce(state = initialState, action = {}) {
  return action.type === TICK
    ? action.payload
    : state;
}
