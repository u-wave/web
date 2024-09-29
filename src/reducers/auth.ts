import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { mutate } from 'swr';
import type { JsonObject } from 'type-fest';
import type { Playlist } from './playlists';
import type { User } from './users';
import uwFetch from '../utils/fetch';
import { createAsyncThunk } from '../redux/api';
import { syncTimestamps } from './server';
import * as Session from '../utils/Session';
import type { StoreState } from '../redux/configureStore';

interface Media {
  media: {
    _id: string,
    sourceType: string,
    sourceID: string,
    sourceData: Record<string, unknown> | null,
    artist: string,
    title: string,
    duration: number,
    thumbnail: string,
  },
  artist: string,
  title: string,
  start: number,
  end: number,
}
interface PlaylistItem extends Media {
  _id: string,
  createdAt: string,
  updatedAt: string,
}

interface State {
  strategies: string[];
  token: string | null;
  user: string | null;
}

const initialState: State = {
  strategies: ['local'],
  token: null,
  user: null,
};

function selectCurrentUser(state: StoreState) {
  const userID = state.auth.user;
  if (userID) {
    return state.users.users[userID] ?? null;
  }
  return null;
}

export type InitialStatePayload = {
  motd: string | null,
  user: User | null,
  users: User[],
  guests: number,
  roles: Record<string, string[]>,
  booth: {
    historyID: string,
    media: Media,
    userID: string,
    playedAt: number,
    stats: {
      upvotes: string[],
      downvotes: string[],
      favorites: string[],
    },
  } | null,
  autoLeave?: boolean, // Only on recent u-wave-core
  waitlist: string[],
  waitlistLocked: boolean,
  activePlaylist: string | null,
  firstActivePlaylistItem: PlaylistItem | null,
  playlists: Playlist[] | null,
  socketToken: string | null,
  authStrategies: string[],
  time: number,
};
export const initState = createAsyncThunk('auth/now', async (_payload: void, api) => {
  const clientTimeBefore = Date.now();

  const state = await uwFetch<InitialStatePayload>(['/now', { signal: api.signal }]);

  mutate('/booth/history');
  api.dispatch(syncTimestamps({ clientTimeBefore, serverTime: state.time }));

  return state;
});

type LoginPayload = { email: string, password: string };
export const login = createAsyncThunk('auth/login', async (payload: LoginPayload, api) => {
  const { data, meta } = await uwFetch<{
    data: User,
    meta: { jwt: string },
  }>(['/auth/login', {
    method: 'post',
    qs: { session: 'cookie' },
    data: payload,
    signal: api.signal,
  }]);

  const now = await api.dispatch(initState());
  const { socketToken } = now.payload as { socketToken: string };

  return {
    user: data,
    socketToken,
    token: meta.jwt,
  };
});

type FinishSocialLoginPayload = { service: string, params: JsonObject };
export const finishSocialLogin = createAsyncThunk('auth/finishSocialLogin', async (payload: FinishSocialLoginPayload, api) => {
  const { meta } = await uwFetch<{
    meta: { jwt: string },
  }>([`/auth/service/${payload.service}/finish`, { method: 'post', data: payload.params }]);

  const now = await api.dispatch(initState());
  const { user, socketToken } = now.payload as { user: User, socketToken: string };

  return {
    user,
    socketToken,
    token: meta.jwt,
  };
});

type RegisterPayload = {
  email: string,
  username: string,
  password: string,
  grecaptcha?: string | null,
};
export const register = createAsyncThunk('auth/register', async (payload: RegisterPayload, api) => {
  await uwFetch<{ data: User }>(['/auth/register', {
    method: 'post',
    data: payload,
    signal: api.signal,
  }]);

  await api.dispatch(login({
    email: payload.email,
    password: payload.password,
  }));
});

export const changeUsername = createAsyncThunk('auth/changeUsername', async (username: string, api) => {
  const user = selectCurrentUser(api.getState());
  if (!user) {
    throw new Error('Not logged in');
  }

  const { data } = await uwFetch<{ data: User }>([`/users/${user._id}/username/`, {
    method: 'put',
    data: { username },
    signal: api.signal,
  }]);

  return {
    user: data,
  };
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await uwFetch<void>(['/auth', { method: 'delete' }]);
  Session.unset();
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (email: string) => {
  await uwFetch<void>(['/auth/password/reset', { method: 'post', data: email }]);
});

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSessionToken(state, { payload }: PayloadAction<string>) {
      state.token = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initState.fulfilled, (state, action) => {
        const { payload } = action;
        state.strategies = payload.authStrategies;
        state.user = payload.user?._id ?? null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user._id;
      })
      .addCase(login.rejected, (state) => {
        state.token = null;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      });
  },
  selectors: {
    currentUserID: (state) => state.user,
    token: (state) => state.token,
    strategies: (state) => state.strategies,
  },
});

export default slice.reducer;

export const {
  setSessionToken,
} = slice.actions;
export const {
  currentUserID: currentUserIDSelector,
  token: tokenSelector,
  strategies: authStrategiesSelector,
} = slice.selectors;
export { selectCurrentUser as currentUserSelector };

export function isLoggedInSelector(state: StoreState) {
  return selectCurrentUser(state) != null;
}

export function supportsAuthStrategy(name: string) {
  return (state: StoreState) => authStrategiesSelector(state).includes(name);
}

const SOCIAL_STRATEGIES = ['google'];
export function supportsSocialAuthSelector(state: StoreState) {
  const strategies = authStrategiesSelector(state);
  return SOCIAL_STRATEGIES.some((strategy) => strategies.includes(strategy));
}
