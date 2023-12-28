import type { AnyAction } from 'redux';
import type { StoreState } from '../redux/configureStore';

type State = string[];

export default function reduce(state: State = [], action: AnyAction): State {
  const { type, payload, error } = action;
  if (error) {
    const message = (typeof error === 'object' && error?.message) ?? payload?.message ?? 'Unknown error';
    // Avoid adding the same error over and over
    if (state.length === 0 || state[state.length - 1] !== message) {
      return [...state, message];
    }
  } else if (type === 'errors/DISMISS') {
    return state.slice(1);
  }
  return state;
}

export const firstErrorSelector = (state: StoreState) => state.errors[0];
