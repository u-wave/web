import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type State =
  | { type: null, url: null }
  | { type: 'playlist', url: string }
  | { type: 'channel', url: string }

const initialState = {
  type: null,
  url: null,
} as State;

const slice = createSlice({
  name: 'youtube',
  initialState,
  reducers: {
    importFromChannel(_state, { payload }: PayloadAction<{ url: string }>) {
      return { type: 'channel', url: payload.url };
    },
    importFromPlaylist(_state, { payload }: PayloadAction<{ url: string }>) {
      return { type: 'playlist', url: payload.url };
    },
    reset() {
      return initialState;
    },
  },
});

export const {
  importFromChannel,
  importFromPlaylist,
  reset,
} = slice.actions;

export default slice.reducer;
