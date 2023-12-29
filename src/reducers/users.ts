import type { AnyAction } from 'redux';
import {
  type PayloadAction,
  createSelector,
  createSlice,
  type ThunkAction,
} from '@reduxjs/toolkit';
import indexBy from 'just-index';
import naturalCmp from 'natural-compare';
import type { StoreState } from '../redux/configureStore';
import { currentUserIDSelector, initState } from './auth';
import { rolesSelector } from './config';

const SUPERUSER_ROLE = '*';

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
    builder.addCase(initState.fulfilled, (state, action) => {
      state.guests = action.payload.guests;
      // this is merged in instead of replacing the state, because sometimes the
      // JOIN event from the current user comes in before the LOAD event, and then
      // the current user is sometimes excluded from the state. it looks like this
      // approach could cause problems, too, though.
      // TODO maybe replace state instead anyway and merge in the current user?
      Object.assign(state.users, indexBy(action.payload.users, '_id'));
    });
  },
  selectors: {
    usersByID: (state) => state.users,
    user: (state, id: string) => state.users[id],
  },
});

// So other reducers can use them
export const { actions } = slice;

export const {
  receiveGuestCount,
  userJoin,
} = actions;
export const {
  user: userSelector,
  usersByID: usersSelector,
} = slice.selectors;

export function currentUserSelector(state: StoreState) {
  const userID = currentUserIDSelector(state);
  if (userID) {
    return userSelector(state, userID);
  }
  return null;
}

// Flatten a user's roles.
function getAllUserRoles(roles: Record<string, string[]>, user: User) {
  function getSubRoles(subRoles: string[], role: string): string[] {
    // Recursive Reduce!
    return roles[role]!.reduce(
      getSubRoles,
      [role, ...subRoles],
    );
  }
  return user.roles ? user.roles.reduce(getSubRoles, []) : [];
}

function compareUsers(roles: Record<string, string[]>) {
  return (a: User, b: User) => {
    const aRoles = getAllUserRoles(roles, a);
    const bRoles = getAllUserRoles(roles, b);
    // Sort superusers to the top,
    if (aRoles.includes(SUPERUSER_ROLE)) {
      return -1;
    }
    if (bRoles.includes(SUPERUSER_ROLE)) {
      return 1;
    }
    // other users by the amount of permissions they have,
    if (aRoles.length > bRoles.length) {
      return -1;
    }
    if (aRoles.length < bRoles.length) {
      return 1;
    }
    // and sort by username if the roles are equal.
    return naturalCmp(a.username.toLowerCase(), b.username.toLowerCase());
  };
}

export const userListSelector = createSelector(
  [rolesSelector, usersSelector],
  (roles, users) => Object.values(users).sort(compareUsers(roles)),
);

export function userCountSelector(state: StoreState) {
  return Object.keys(state.users.users).length;
}

export function guestCountSelector(state: StoreState) {
  return state.users.guests;
}

export function listenerCountSelector(state: StoreState) {
  return userCountSelector(state) + guestCountSelector(state);
}

export function userHasRole(roleConfig: Record<string, string[]>, user: User, role: string) {
  if (user.roles.includes('*')) {
    return true;
  }

  // TODO would be faster to stop iterating as soon as we find it
  return getAllUserRoles(roleConfig, user).includes(role);
}

export function userHasRoleSelector(state: StoreState, user: User, role: string) {
  const roleConfig = rolesSelector(state);
  return userHasRole(roleConfig, user, role);
}

export function currentUserHasRoleSelector(state: StoreState, role: string) {
  const currentUser = currentUserSelector(state);
  return currentUser != null && userHasRoleSelector(state, currentUser, role);
}

export function isModeratorSelector(state: StoreState) {
  return currentUserHasRoleSelector(state, 'moderator');
}

export function isManagerSelector(state: StoreState) {
  return currentUserHasRoleSelector(state, 'manager');
}

// TODO move to prepare()?
export function userLeave(payload: { userID: string }):
    ThunkAction<unknown, StoreState, never, AnyAction> {
  return (dispatch, getState) => {
    const user = userSelector(getState(), payload.userID);
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
    const user = userSelector(getState(), payload.userID);
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
    const user = userSelector(getState(), payload.userID);
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
    const user = userSelector(getState(), payload.userID);
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
