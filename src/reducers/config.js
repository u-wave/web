import { INIT_STATE } from '../constants/ActionTypes';

const initialState = {};

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case INIT_STATE: {
      const patch = {};
      if (payload.roles) {
        patch.roles = payload.roles;
      }
      if (payload.config?.['u-wave:base']) {
        Object.assign(patch, payload.config['u-wave:base']);
      }
      if (Object.keys(patch).length === 0) {
        return state;
      }
      return { ...state, ...patch };
    }
    default:
      return state;
  }
}
