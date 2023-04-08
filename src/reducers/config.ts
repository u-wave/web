import { AnyAction } from 'redux';
import { initState } from './auth';

interface State {
  roles: undefined | Record<string, string[]>;
  apiUrl?: string,
  socketUrl?: string,
  emoji: Record<string, string>,
}

export const initialState: State = {
  roles: undefined,
  emoji: {},
};

export default function reduce(state = initialState, action: AnyAction): State {
  const { type, payload } = action;
  switch (type) {
    case initState.fulfilled.type:
      if (payload.roles) {
        return {
          ...state,
          roles: payload.roles,
        };
      }
      return state;
    default:
      return state;
  }
}
