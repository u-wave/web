import { TRANSITION } from '../constants/ActionTypes';

export default function reducer(state = 'main', action) {
  if (action.type === TRANSITION) {
    return action.payload;
  }
  return state;
}
