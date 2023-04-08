import type { AnyAction } from 'redux';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INIT_STATE, SET_TOKEN } from '../constants/ActionTypes';
import type { User } from './users';
import { initState } from '../actions/LoginActionCreators';
import uwFetch from '../utils/fetch';
import { currentUserSelector } from '../selectors/userSelectors';

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

  const { socketToken } = await api.dispatch(initState());

  return {
    user: data,
    socketToken: socketToken as string,
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
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(INIT_STATE, (state, action: AnyAction) => {
        const { payload } = action;
        state.strategies = payload.authStrategies;
        state.user = payload.user?._id;
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
});

export default slice.reducer;
