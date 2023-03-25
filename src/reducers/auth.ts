import type { AnyAction } from 'redux';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INIT_STATE, SET_TOKEN } from '../constants/ActionTypes';
import type { User } from './users';
import { initState } from '../actions/LoginActionCreators';

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
  const response = await fetch('/api/auth/login?session=cookie', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal: api.signal,
  });
  if (!response.ok) {
    throw new Error('login failed');
  }

  const { data, meta }: {
    data: User,
    meta: { jwt: string },
  } = await response.json();

  const { socketToken } = await api.dispatch(initState());

  return {
    user: data,
    socketToken: socketToken as string,
    token: meta.jwt,
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
