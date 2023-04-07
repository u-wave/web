import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { ThemeOptions } from '@mui/material/styles';
import merge from 'deepmerge';
import initialState from '../theme';

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
    apply(state, action: PayloadAction<ThemeOptions>) {
      return merge(state, action.payload);
    },
  },
});

export const {
  reset,
  apply,
} = slice.actions;
export default slice.reducer;
