import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '../../redux/api';
import uwFetch from '../../utils/fetch';
import { createPlaylist } from '../../reducers/playlists';

export type State =
  | { type: null, url: null }
  | { type: 'playlist', url: string }
  | { type: 'channel', url: string }

const initialState = {
  type: null,
  url: null,
} as State;

const importPlaylist = createAsyncThunk('youtube/importPlaylist', async (
  { name, sourceID }: { name: string, sourceID: string },
  api,
) => {
  api.dispatch(createPlaylist.pending(api.requestId, name));

  const playlist = await uwFetch<{
    _id: string,
    name: string,
    size: number,
    author: string,
    createdAt: string,
    updatedAt: string,
  }>(['/import/youtube/importplaylist', {
    method: 'post',
    data: { id: sourceID, name },
  }]);

  api.dispatch(createPlaylist.fulfilled(playlist, api.requestId, name));
});

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
export { importPlaylist };

export default slice.reducer;
