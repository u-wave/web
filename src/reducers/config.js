import { INIT_STATE, LOAD_EMOTES } from '../constants/ActionTypes';

export const initialState = {
  roles: undefined,
  emoji: {},
  serverEmotes: [],
};

export default function reduce(state = initialState, action = {}) {
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
