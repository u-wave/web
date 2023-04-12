import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initState } from './auth';

interface State {
  waitlist: string[];
  locked: boolean;
}

const initialState: State = {
  waitlist: [],
  locked: false,
};

const slice = createSlice({
  name: 'waitlist',
  initialState,
  reducers: {
    lock(state, action: PayloadAction<{ locked: boolean }>) {
      state.locked = action.payload.locked;
    },
    clear(state) {
      state.waitlist = [];
    },
    join(state, action: PayloadAction<{ userID: string, waitlist: string[] }>) {
      state.waitlist = action.payload.waitlist;
    },
    leave(state, action: PayloadAction<{ userID: string, waitlist: string[] }>) {
      state.waitlist = action.payload.waitlist;
    },
    moved(state, action: PayloadAction<{
      userID: string,
      moderatorID: string,
      position: number,
      waitlist: string[],
    }>) {
      state.waitlist = action.payload.waitlist;
    },
    update(state, action: PayloadAction<{ waitlist: string[] }>) {
      state.waitlist = action.payload.waitlist;
    },
  },
  extraReducers(builder) {
    builder.addCase(initState.fulfilled, (state, action) => {
      state.waitlist = action.payload.waitlist;
      state.locked = action.payload.waitlistLocked;
    });
  },
});

export const {
  lock,
  clear,
  join,
  leave,
  moved,
  update,
} = slice.actions;

export default slice.reducer;
