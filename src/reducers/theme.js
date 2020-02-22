import merge from 'deepmerge';
import { RESET_THEME, APPLY_THEME } from '../constants/ActionTypes';
import initialState from '../theme';

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_THEME:
      return initialState;
    case APPLY_THEME:
      return merge(state, action.payload);
    default:
      return state;
  }
}
