import { type PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { createStructuredSelector } from 'reselect';
import type { StoreState } from '../redux/configureStore';
import { initState } from './auth';
import { currentUserSelector, usersSelector } from './users';
import { djSelector, isCurrentDJSelector, timeRemainingSelector } from './booth';

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

export function isLockedSelector(state: StoreState) {
  return state.waitlist.locked;
}

export function sizeSelector(state: StoreState) {
  return state.waitlist.waitlist.length;
}

export function waitlistIDsSelector(state: StoreState) {
  return state.waitlist.waitlist;
}

export const waitlistUsersSelector = createSelector(
  [waitlistIDsSelector, usersSelector],
  (ids, users) => ids.map((id) => users[id]),
);

export const djAndWaitlistUsersSelector = createSelector(
  [djSelector, waitlistUsersSelector],
  (dj, waitlist) => (dj ? [dj, ...waitlist] : waitlist),
);

export function positionSelector(state: StoreState) {
  const user = currentUserSelector(state);
  if (user == null) {
    return -1;
  }
  return waitlistIDsSelector(state).indexOf(user._id);
}

export function userInWaitlistSelector(state: StoreState) {
  const position = positionSelector(state);
  if (position !== -1) {
    return true;
  }

  return isCurrentDJSelector(state);
}

export const waitlistSelector = createStructuredSelector({
  locked: isLockedSelector,
  users: waitlistUsersSelector,
});

// Most videos come in at around 4 minutes.
const ESTIMATED_PLAY_DURATION = 4 * 60 * 1000;
export function baseEtaSelector(state: StoreState) {
  const position = positionSelector(state);
  const size = sizeSelector(state);
  return (position === -1 ? size : position) * ESTIMATED_PLAY_DURATION;
}

export function etaSelector(state: StoreState) {
  return baseEtaSelector(state) + timeRemainingSelector(state);
}

export default slice.reducer;
