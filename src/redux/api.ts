import * as rtk from '@reduxjs/toolkit';
import type { StoreState } from './configureStore';

export const createAsyncThunk = rtk.createAsyncThunk.withTypes<{
  state: StoreState,
}>();
