import * as rtk from '@reduxjs/toolkit';
import type { ThunkAction } from 'redux-thunk';
import type { StoreState } from './configureStore';

// eslint-disable-next-line import/prefer-default-export
export const createAsyncThunk = rtk.createAsyncThunk.withTypes<{
  state: StoreState,
}>();

export type Thunk<ReturnType> = ThunkAction<
  ReturnType,
  StoreState,
  never,
  rtk.UnknownAction
>;
