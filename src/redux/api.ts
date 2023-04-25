import * as rtk from '@reduxjs/toolkit';
import type { StoreState } from './configureStore';

// eslint-disable-next-line import/prefer-default-export
export const createAsyncThunk = rtk.createAsyncThunk.withTypes<{
  state: StoreState,
}>();
