import type { AnyAction } from 'redux';
import { type PayloadAction, createSlice, ThunkAction } from '@reduxjs/toolkit';
import indexBy from 'just-index';
import { INIT_STATE } from '../constants/ActionTypes';
import { StoreState } from '../redux/configureStore';

export interface User {
  _id: string;
  username: string;
  avatar: string;
  roles: string[];
}

interface State {
  users: Record<string, User>;
  guests: number;
}

const initialState: State = {
  users: {},
  guests: 0,
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    receiveGuestCount(state, action: PayloadAction<{ guests: number }>) {
      state.guests = action.payload.guests;
    },
    userJoin(state, action: PayloadAction<{ user: User }>) {
      state.users[action.payload.user._id] = action.payload.user;
    },
    userLeave(state, action: PayloadAction<{ user: User, userID: string }>) {
      delete state.users[action.payload.userID];
    },
    addRoles(state, action: PayloadAction<{ user: User, userID: string, roles: string[] }>) {
      const user = state.users[action.payload.userID];
      if (user) {
        user.roles = Array.from(new Set([...user.roles, ...action.payload.roles]));
      }
    },
    removeRoles(state, action: PayloadAction<{ user: User, userID: string, roles: string[] }>) {
      const user = state.users[action.payload.userID];
      if (user) {
        const remove = new Set(action.payload.roles);
        user.roles = user.roles.filter((role) => !remove.has(role));
      }
    },
    usernameChanged(state, action: PayloadAction<{
      user: User,
      userID: string,
      username: string,
    }>) {
      const user = state.users[action.payload.userID];
      if (user) {
        user.username = action.payload.username;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(INIT_STATE, (state, action: AnyAction) => {
      state.guests = action.payload.guests;
      // this is merged in instead of replacing the state, because sometimes the
      // JOIN event from the current user comes in before the LOAD event, and then
      // the current user is sometimes excluded from the state. it looks like this
      // approach could cause problems, too, though.
      // TODO maybe replace state instead anyway and merge in the current user?
      Object.assign(state.users, indexBy(action.payload.users, '_id'));
    });
  },
});

// So other reducers can use them
export const { actions } = slice;

export const {
  receiveGuestCount,
  userJoin,
} = actions;

function selectUser(state: StoreState, userID: string) {
  return state.users.users[userID];
}

export function userLeave(payload: { userID: string }):
    ThunkAction<unknown, StoreState, never, AnyAction> {
  return (dispatch, getState) => {
    const user = selectUser(getState(), payload.userID);
    if (user) {
      dispatch(slice.actions.userLeave({
        user,
        userID: payload.userID,
      }));
    }
  };
}

export function addRoles(payload: { userID: string, roles: string[] }):
    ThunkAction<unknown, StoreState, never, AnyAction> {
  return (dispatch, getState) => {
    const user = selectUser(getState(), payload.userID);
    if (user) {
      dispatch(slice.actions.addRoles({
        user,
        userID: payload.userID,
        roles: payload.roles,
      }));
    }
  };
}

export function removeRoles(payload: { userID: string, roles: string[] }):
    ThunkAction<unknown, StoreState, never, AnyAction> {
  return (dispatch, getState) => {
    const user = selectUser(getState(), payload.userID);
    if (user) {
      dispatch(slice.actions.removeRoles({
        user,
        userID: payload.userID,
        roles: payload.roles,
      }));
    }
  };
}

export function usernameChanged(payload: { userID: string, username: string }):
    ThunkAction<unknown, StoreState, never, AnyAction> {
  return (dispatch, getState) => {
    const user = selectUser(getState(), payload.userID);
    if (user) {
      dispatch(slice.actions.usernameChanged({
        user,
        userID: payload.userID,
        username: payload.username,
      }));
    }
  };
}

export default slice.reducer;
