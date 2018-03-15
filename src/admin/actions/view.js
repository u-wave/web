import { TRANSITION } from '../constants/ActionTypes';

// eslint-disable-next-line import/prefer-default-export
export function transition(target) {
  return {
    type: TRANSITION,
    payload: target,
  };
}
