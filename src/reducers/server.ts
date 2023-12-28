import type { AnyAction } from 'redux';
import type { StoreState } from '../redux/configureStore';
import { SOCKET_CONNECTED, SOCKET_DISCONNECTED } from '../constants/ActionTypes';

interface State {
  connected: boolean;
}

const initialState: State = {
  connected: false,
};

export default function serverReducer(state = initialState, action: AnyAction): State {
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

export const isConnectedSelector = (state: StoreState) => state.server.connected;
