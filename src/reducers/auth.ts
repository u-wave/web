import type { AnyAction } from 'redux';
import { createSlice } from '@reduxjs/toolkit';
import { mutate } from 'swr';
import { SET_TOKEN } from '../constants/ActionTypes';
import type { Playlist } from './playlists';
import type { User } from './users';
import uwFetch from '../utils/fetch';
import { createAsyncThunk } from '../redux/api';
import { currentUserSelector } from '../selectors/userSelectors';
import { syncTimestamps } from '../actions/TickerActionCreators';

interface Media {
  media: {
    _id: string,
    sourceType: string,
    sourceID: string,
    sourceData: object,
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
  } | null,
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
  const beforeTime = Date.now();

  const state = await uwFetch<InitialStatePayload>(['/now', { signal: api.signal }]);

  mutate('/booth/history');
  api.dispatch(syncTimestamps(beforeTime, state.time));

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

export const changeUsername = createAsyncThunk('auth/changeUsername', async (username: string, api) => {
  const user = currentUserSelector(api.getState());
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

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initState.fulfilled, (state, action) => {
        const { payload } = action;
        state.strategies = payload.authStrategies;
        state.user = payload.user?._id ?? null;
      })
      .addCase(SET_TOKEN, (state, action: AnyAction) => {
        const { payload } = action;
        state.token = payload.token;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user._id;
      })
      .addCase(login.rejected, (state) => {
        state.token = null;
        state.user = null;
      });
  },
  selectors: {
    currentUserID: (state) => state.user,
  },
});

export default slice.reducer;
