import { type PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import uwFetch from '../utils/fetch';

interface State {
  offset: number,
}

const initialState: State = {
  offset: 0,
};

function calculateOffset(clientTimeBefore: number, serverTime: number) {
  const clientTimeAfter = Date.now();
  const offset = Math.round(((serverTime - clientTimeBefore) + (serverTime - clientTimeAfter)) / 2);
  return offset;
}

export const sync = createAsyncThunk('time/sync', async () => {
  const clientTimeBefore = Date.now();
  const { time: serverTime } = await uwFetch<{ time: number }>(['/now']);

  const offset = calculateOffset(clientTimeBefore, serverTime);
  return offset;
});

const slice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    syncTimestamps: (
      state,
      action: PayloadAction<{ clientTimeBefore: number, serverTime: number }>,
    ) => {
      const { clientTimeBefore, serverTime } = action.payload;
      state.offset = calculateOffset(clientTimeBefore, serverTime);
    },
  },
  extraReducers(builder) {
    builder.addCase(sync.fulfilled, (state, action) => {
      state.offset = action.payload;
    });
  },
});

export default slice.reducer;

export const {
  syncTimestamps,
} = slice.actions;
