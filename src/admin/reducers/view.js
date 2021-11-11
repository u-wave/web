import { TRANSITION } from '../constants/ActionTypes';

export default function reducer(state = 'main', action = undefined) {
  if (action.type === TRANSITION) {
    return action.payload;
  }
  return state;
}
