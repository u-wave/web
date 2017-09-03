import { SOCKET_CONNECTED, SOCKET_DISCONNECTED } from '../constants/ActionTypes';

const initialState = {
  connected: false
};

export default function serverReducer(state = initialState, action = {}) {
  const { type } = action;

  switch (type) {
  case SOCKET_CONNECTED:
    return { ...state, connected: true };
  case SOCKET_DISCONNECTED:
    return { ...state, connected: false };
  default:
    return state;
  }
}
