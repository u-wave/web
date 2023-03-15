import { AnyAction } from 'redux';
import { SET_TIMER, OFFSET } from '../constants/ActionTypes';

interface State {
  timer: ReturnType<typeof setTimeout> | null,
  offset: number,
}

const initialState: State = {
  timer: null,
  offset: 0,
};

export default function reduce(state = initialState, action: AnyAction): State {
  switch (action.type) {
    case SET_TIMER:
      return { ...state, timer: action.payload };
    case OFFSET:
      return { ...state, offset: action.payload };
    default:
      return state;
  }
}
