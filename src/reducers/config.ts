import { AnyAction } from 'redux';
import { INIT_STATE, LOAD_EMOTES } from '../constants/ActionTypes';

interface State {
  roles: undefined | Record<string, string[]>;
  apiUrl?: string,
  socketUrl?: string,
  emoji: Record<string, string>,
  serverEmotes: { name: string, url: string }[],
}

export const initialState: State = {
  roles: undefined,
  emoji: {},
  serverEmotes: [],
};

export default function reduce(state = initialState, action: AnyAction): State {
  const { type, payload } = action;
  switch (type) {
    case INIT_STATE:
      if (payload.roles) {
        return {
          ...state,
          roles: payload.roles,
        };
      }
      return state;
    case LOAD_EMOTES:
      return {
        ...state,
        serverEmotes: payload.emotes,
      };
    default:
      return state;
  }
}
