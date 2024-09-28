import { type PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { createStructuredSelector } from 'reselect';
import type { StoreState } from '../redux/configureStore';
import { currentUserIDSelector, initState } from './auth';
import { type User, usersSelector } from './users';
import { djSelector, isCurrentDJSelector, timeRemainingSelector } from './booth';
import { createAsyncThunk } from '../redux/api';
import uwFetch from '../utils/fetch';

interface State {
  waitlist: string[];
  locked: boolean;
}

const initialState: State = {
  waitlist: [],
  locked: false,
};

export const joinWaitlist = createAsyncThunk('waitlist/join', async (_: void, api) => {
  const userID = currentUserIDSelector(api.getState());
  await uwFetch<{ data: string[] }>(['/waitlist', {
    method: 'post',
    data: { userID },
  }]);
});

export const leaveWaitlist = createAsyncThunk('waitlist/join', async (_: void, api) => {
  const userID = currentUserIDSelector(api.getState());
  await uwFetch<{ data: string[] }>([`/waitlist/${userID}`, { method: 'delete' }]);
});

export const addToWaitlist = createAsyncThunk('waitlist/add', async (user: User) => {
  const userID = user._id;
  await uwFetch<{ data: string[] }>(['/waitlist', {
    method: 'post',
    data: { userID },
  }]);
});

export const moveWaitlistUser = createAsyncThunk('waitlist/move', async (
  { userID, position }: { userID: string, position: number },
) => {
  await uwFetch(['/waitlist/move', {
    method: 'put',
    data: { userID, position },
  }]);
});

export const removeWaitlistUser = createAsyncThunk('waitlist/remove', async (
  { userID }: { userID: string },
  api,
) => {
  const dj = djSelector(api.getState());
  if (dj && dj._id === userID) {
    await uwFetch(['/booth/skip', {
      method: 'post',
      data: { userID, reason: '', remove: true },
    }]);
  } else {
    await uwFetch([`/waitlist/${userID}`, { method: 'delete' }]);
  }
});

export const lockWaitlist = createAsyncThunk('waitlist/lock', async (lock: boolean) => {
  await uwFetch(['/waitlist/lock', {
    method: 'put',
    data: { lock, clear: false },
  }]);
});

export const clearWaitlist = createAsyncThunk('waitlist/clear', async () => {
  await uwFetch(['/waitlist', { method: 'delete' }]);
});

const slice = createSlice({
  name: 'waitlist',
  initialState,
  reducers: {
    lockChanged(state, action: PayloadAction<{ locked: boolean }>) {
      state.locked = action.payload.locked;
    },
    clear(state) {
      state.waitlist = [];
    },
    receiveJoin(state, action: PayloadAction<{ userID: string, waitlist: string[] }>) {
      state.waitlist = action.payload.waitlist;
    },
    receiveLeave(state, action: PayloadAction<{ userID: string, waitlist: string[] }>) {
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
    waitlistUpdated(state, action: PayloadAction<{ waitlist: string[] }>) {
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
  lockChanged,
  clear,
  receiveJoin,
  receiveLeave,
  moved,
  waitlistUpdated,
} = slice.actions;

export function waitlistIsLockedSelector(state: StoreState) {
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
  const userID = currentUserIDSelector(state);
  if (userID == null) {
    return -1;
  }
  return waitlistIDsSelector(state).indexOf(userID);
}

export function userInWaitlistSelector(state: StoreState) {
  const position = positionSelector(state);
  if (position !== -1) {
    return true;
  }

  return isCurrentDJSelector(state);
}

export const waitlistSelector = createStructuredSelector({
  locked: waitlistIsLockedSelector,
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
