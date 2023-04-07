import type { AnyAction } from 'redux';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { INIT_STATE } from '../constants/ActionTypes';

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
    update(state, action: PayloadAction<{ waitlist: string[] }>) {
      state.waitlist = action.payload.waitlist;
    },
  },
  extraReducers(builder) {
    builder.addCase(INIT_STATE, (state, action: AnyAction) => {
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
  update,
} = slice.actions;

export default slice.reducer;
