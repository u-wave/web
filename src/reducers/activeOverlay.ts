import type { AnyAction } from 'redux';
import { OPEN_OVERLAY, CLOSE_OVERLAY, TOGGLE_OVERLAY } from '../constants/ActionTypes';

const initialState: string | null = null;

export default function reduce(state = initialState, action: AnyAction) {
  const { type, payload } = action;
  switch (type) {
    case OPEN_OVERLAY:
      return payload.overlay;
    case TOGGLE_OVERLAY:
      return state === payload.overlay ? null : payload.overlay;
    case CLOSE_OVERLAY:
      return null;
    default:
      return state;
  }
}
