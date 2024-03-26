import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SOCKET_CONNECTED, SOCKET_DISCONNECTED } from '../constants/ActionTypes';
import { createAsyncThunk } from '../redux/api';
import uwFetch from '../utils/fetch';

interface State {
  serverTimeOffset: number;
  /** Is the WebSocket connected? */
  connected: boolean;
}

const initialState: State = {
  serverTimeOffset: 0,
  connected: false,
};

function calculateOffset(clientTimeBefore: number, serverTime: number) {
  const clientTimeAfter = Date.now();
  const offset = Math.round(((serverTime - clientTimeBefore) + (serverTime - clientTimeAfter)) / 2);
  return offset;
}

export const sync = createAsyncThunk('server/syncTime', async () => {
  const clientTimeBefore = Date.now();
  const { time: serverTime } = await uwFetch<{ time: number }>(['/now']);

  const offset = calculateOffset(clientTimeBefore, serverTime);
  return offset;
});

const slice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    syncTimestamps: (
      state,
      action: PayloadAction<{ clientTimeBefore: number, serverTime: number }>,
    ) => {
      const { clientTimeBefore, serverTime } = action.payload;
      state.serverTimeOffset = calculateOffset(clientTimeBefore, serverTime);
    },
  },
  extraReducers(builder) {
    builder.addCase(sync.fulfilled, (state, action) => {
      state.serverTimeOffset = action.payload;
    });
    builder.addCase(SOCKET_CONNECTED, (state) => {
      state.connected = true;
    });
    builder.addCase(SOCKET_DISCONNECTED, (state) => {
      state.connected = true;
    });
  },
  selectors: {
    currentTime: (state) => Date.now() + state.serverTimeOffset,
    /** Is the WebSocket connected? */
    isConnected: (state) => state.connected,
  },
});

export default slice.reducer;

export const {
  syncTimestamps,
} = slice.actions;

export const {
  currentTime: currentTimeSelector,
  isConnected: isConnectedSelector,
} = slice.selectors;
