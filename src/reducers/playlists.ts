import type { AnyAction } from 'redux';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import escapeStringRegExp from 'escape-string-regexp';
import indexBy from 'just-index';
import { createAsyncThunk } from '../redux/api';
import uwFetch from '../utils/fetch';
import {
  LOAD_PLAYLIST_START,
  LOAD_PLAYLIST_COMPLETE,
  PLAYLIST_CYCLED,
  DELETE_PLAYLIST_START,
  DELETE_PLAYLIST_COMPLETE,
  ADD_MEDIA_START,
  ADD_MEDIA_COMPLETE,
  UPDATE_MEDIA_START,
  UPDATE_MEDIA_COMPLETE,
  FILTER_PLAYLIST_ITEMS,
  FILTER_PLAYLIST_ITEMS_COMPLETE,
  DO_FAVORITE_COMPLETE,
  LOGOUT_COMPLETE,
} from '../constants/ActionTypes';
import type { Media } from './booth';
import { initState } from './auth';

export interface Playlist {
  _id: string;
  name: string;
  loading?: boolean;
  active?: boolean;
  size: number;
}

export interface PlaylistItem extends Media {
  createdAt: string;
  updatedAt: string;
  loading?: boolean;
}

type PlaylistItemList = (PlaylistItem | null)[];

export const importPanelSymbol = Symbol('import panel');
export const searchPanelSymbol = Symbol('search panel');
interface State {
  playlists: Record<string, Playlist>;
  playlistItems: Record<string, PlaylistItemList>;
  activePlaylistID: string | null;
  selectedPlaylistID: (typeof importPanelSymbol) | (typeof searchPanelSymbol) | string | null;
  currentFilter: {
    playlistID: string,
    filter: string,
    items: PlaylistItemList,
  } | null;
}

const initialState: State = {
  playlists: {},
  playlistItems: {},
  activePlaylistID: null,
  selectedPlaylistID: null,
  currentFilter: null,
};

type InsertPosition =
  | { at: 'start', after?: undefined }
  | { at: 'end', after?: undefined }
  | { at?: undefined, after: null | -1 | string }

function processInsert(list: PlaylistItemList, insert: PlaylistItem[], position: InsertPosition) {
  let insertIdx = 0;
  if (position.at === 'end') {
    insertIdx = list.length;
  } else if (position.at === 'start') {
    insertIdx = 0;
  } else if (position.after != null && position.after !== -1) {
    insertIdx = list.findIndex((media) => media !== null && media._id === position.after) + 1;
  }
  return [
    ...list.slice(0, insertIdx),
    ...insert,
    ...list.slice(insertIdx),
  ];
}

// Moves a list of media items to a given position in the playlist.
function processMove(list: PlaylistItemList, movedMedia: PlaylistItem[], location: InsertPosition) {
  // Take all moved media items out of the playlist…
  const wasMoved = indexBy(movedMedia, '_id');
  const newPlaylist = list.filter((media) => media === null || !wasMoved[media._id]);
  // …and add them back in at the correct place.
  return processInsert(newPlaylist, movedMedia, location);
}

function mergePlaylistPage(
  size: number,
  oldMedia: PlaylistItemList = [],
  newMedia: PlaylistItem[],
  { page, pageSize }: { page: number, pageSize: number },
) {
  const media: PlaylistItemList = Array(size).fill(null);
  oldMedia.forEach((item, i) => {
    media[i] = item;
  });
  newMedia.forEach((item, i) => {
    media[(page * pageSize) + i] = item;
  });
  return media;
}

function filterCachedPlaylistItems(state: State, playlistID: string, filter: string) {
  const rx = new RegExp(escapeStringRegExp(filter), 'i');
  const playlist = state.playlistItems[playlistID];
  if (playlist) {
    return playlist.filter((item) => item && (
      rx.test(item.artist) || rx.test(item.title)
    ));
  }
  return [];
}

const createPlaylist = createAsyncThunk('playlists/create', async (name: string) => {
  const response = await uwFetch<{
    data: {
      _id: string,
      name: string,
      author: string,
      createdAt: string,
      size: number,
    },
  }>(['/playlists', {
    method: 'post',
    data: { name },
  }]);

  return response.data;
});

const renamePlaylist = createAsyncThunk('playlists/rename', async ({ playlistID, name }: {
  playlistID: string,
  name: string,
}) => {
  const response = await uwFetch<{
    data: {
      _id: string,
      name: string,
      author: string,
      createdAt: string,
      size: number,
    },
  }>([`/playlists/${playlistID}/rename`, {
    method: 'put',
    data: { name },
  }]);

  return response.data;
});

const activatePlaylist = createAsyncThunk('playlists/activate', async (playlistID: string) => {
  await uwFetch([`/playlists/${playlistID}/activate`, {
    method: 'put',
    data: {},
  }]);
});

type InsertTarget = { before: string } | { after: string } | { at: 'start' | 'end' };
function resolveMoveOptions(
  items: (null | { _id: string })[],
  opts: InsertTarget,
) {
  if ('after' in opts) {
    return { after: opts.after };
  }
  if ('before' in opts) {
    for (let i = 0, l = items.length; i < l; i += 1) {
      if (items[i] && items[i]?._id === opts.before) {
        if (i === 0) {
          return { at: 'start' as const };
        }
        return { after: items[i - 1]?._id ?? null };
      }
    }
    return { at: 'end' };
  }
  return { at: opts.at };
}

const movePlaylistItems = createAsyncThunk('playlists/movePlaylistItems', async ({ playlistID, medias, target }: {
  playlistID: string,
  medias: PlaylistItem[],
  target: InsertTarget,
}, api) => {
  const playlistItems = api.getState().playlists.playlistItems[playlistID];
  const location = resolveMoveOptions(playlistItems, target);
  const items = medias.map((media) => media._id);

  await uwFetch([`/playlists/${playlistID}/move`, {
    method: 'put',
    data: { items, ...location },
  }]);

  return { location };
});

const removePlaylistItems = createAsyncThunk('playlists/removePlaylistItems', async ({ playlistID, medias }: {
  playlistID: string,
  medias: PlaylistItem[],
}) => {
  const items = medias.map((media) => media._id);

  const { meta } = await uwFetch<{
      meta: { playlistSize: number },
  }>([`/playlists/${playlistID}/media`, {
    method: 'delete',
    data: { items },
  }]);

  return { newSize: meta.playlistSize };
});

const slice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    selectPlaylist(state, action: PayloadAction<string>) {
      if (state.currentFilter && state.currentFilter.playlistID !== action.payload) {
        state.currentFilter = null;
      }
      state.selectedPlaylistID = action.payload;
    },
    showImportPanel(state) {
      state.selectedPlaylistID = importPanelSymbol;
    },
    showSearchResults(state) {
      state.selectedPlaylistID = searchPanelSymbol;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(initState.fulfilled, (state, { payload }) => {
        if (payload.playlists) {
          state.playlists = indexBy(payload.playlists.map((playlist: Playlist) => ({
            ...playlist,
            active: playlist._id === payload.activePlaylist,
          })), '_id');
          // Preload the first item in the active playlist so it can be shown in
          // the footer bar immediately. Else it would flash "This playlist is empty"
          // for a moment.
          if (payload.activePlaylist && payload.firstActivePlaylistItem) {
            state.playlistItems[payload.activePlaylist] = [payload.firstActivePlaylistItem];
          }
          state.activePlaylistID = payload.activePlaylist;
          state.selectedPlaylistID ??= payload.activePlaylist;
        }
      })
      .addCase(LOGOUT_COMPLETE, () => {
        return initialState;
      })
      .addCase(activatePlaylist.pending, (state, action) => {
        // TODO use a different property here so we can show a loading icon on
        // the "Active" button only, instead of on top of the entire playlist
        state.playlists[action.meta.arg].loading = true;
      })
      .addCase(activatePlaylist.rejected, (state, action) => {
        state.playlists[action.meta.arg].loading = false;
      })
      .addCase(activatePlaylist.fulfilled, (state, action) => {
        // TODO use a different property here so we can show a loading icon on
        // the "Active" button only, instead of on top of the entire playlist
        state.playlists[action.meta.arg].loading = false;
        state.playlists[action.meta.arg].active = true;
        state.activePlaylistID = action.meta.arg;
      })
      .addCase(LOAD_PLAYLIST_START, (state, { payload, meta }: AnyAction) => {
        if (meta.sneaky || meta.page !== 0 || state.playlistItems[payload.playlistID]) {
          return;
        }

        const playlist = state.playlists[payload.playlistID];
        const items = state.playlistItems[payload.playlistID];
        state.playlistItems[payload.playlistID] = Array(playlist.size).fill(null)
          .map((item, index) => items[index] ?? item);
      })
      .addCase(LOAD_PLAYLIST_COMPLETE, (state, { payload, meta, error }: AnyAction) => {
        if (error) {
          state.playlists[meta.playlistID].loading = false;
          return;
        }

        state.playlists[payload.playlistID].loading = false;
        state.playlistItems[payload.playlistID] = mergePlaylistPage(
          meta.size,
          state.playlistItems[payload.playlistID],
          payload.media,
          meta,
        );
      })
      .addCase(FILTER_PLAYLIST_ITEMS, (state, { payload }: AnyAction) => {
        // Only the selected playlist can be filtered.
        if (payload.playlistID !== state.selectedPlaylistID) {
          return;
        }
        if (!payload.filter) {
          state.currentFilter = null;
          return;
        }
        state.currentFilter = {
          playlistID: payload.playlistID,
          filter: payload.filter,
          items: filterCachedPlaylistItems(state, payload.playlistID, payload.filter),
        };
      })
      .addCase(FILTER_PLAYLIST_ITEMS_COMPLETE, (state, { payload, meta }: AnyAction) => {
        // Only the selected playlist can be filtered.
        if (payload.playlistID !== state.selectedPlaylistID || !state.currentFilter) {
          return;
        }
        state.currentFilter.items = mergePlaylistPage(
          meta.size,
          state.currentFilter.items,
          payload.media,
          meta,
        );
      })
      .addCase(PLAYLIST_CYCLED, (state, { payload }: AnyAction) => {
        const playlist = state.playlists[payload.playlistID];
        const items = state.playlistItems[payload.playlistID];
        const newItems = items.slice(1);
        newItems[playlist.size - 1] = items[0]; // eslint-disable-line prefer-destructuring
        state.playlistItems[payload.playlistID] = newItems;
      })
      .addCase(createPlaylist.pending, (state, action) => {
        const id = action.meta.requestId;
        const name = action.meta.arg;

        state.playlists[id] = {
          _id: id,
          name,
          size: 0,
        };
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        delete state.playlists[action.meta.requestId];
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        delete state.playlists[action.meta.requestId];

        const playlist = action.payload;
        state.playlists[playlist._id] = playlist;
        if (state.selectedPlaylistID === action.meta.requestId) {
          state.selectedPlaylistID = playlist._id;
        }
      })
      .addCase(renamePlaylist.fulfilled, (state, action) => {
        const playlist = state.playlists[action.payload._id];
        if (playlist) {
          playlist.name = action.payload.name;
        }
      })
      .addCase(DELETE_PLAYLIST_START, (state, { payload }: AnyAction) => {
        state.playlists[payload.playlistID].loading = true;
      })
      .addCase(DELETE_PLAYLIST_COMPLETE, (state, { payload, meta, error }: AnyAction) => {
        if (error) {
          state.playlists[meta.playlistID].loading = false;
          return;
        }

        state.playlists[payload.playlistID].loading = false;
        delete state.playlists[payload.playlistID];
        delete state.playlistItems[payload.playlistID];
        if (state.selectedPlaylistID === payload.playlistID) {
          state.selectedPlaylistID = state.activePlaylistID;
        }
      })
      .addCase(ADD_MEDIA_START, (state, { payload }: AnyAction) => {
        state.playlists[payload.playlistID].loading = true;
      })
      .addCase(ADD_MEDIA_COMPLETE, (state, { payload, meta, error }: AnyAction) => {
        if (error) {
          state.playlists[meta.playlistID].loading = false;
          return;
        }

        state.playlists[payload.playlistID].loading = false;
        state.playlists[payload.playlistID].size = payload.newSize;
        state.playlistItems[payload.playlistID] = processInsert(
          state.playlistItems[payload.playlistID],
          payload.appendedMedia,
          { after: payload.afterID },
        );
      })
      .addCase(DO_FAVORITE_COMPLETE, (state, { payload }: AnyAction) => {
        state.playlists[payload.playlistID].size = payload.newSize;
        state.playlistItems[payload.playlistID] = processInsert(
          state.playlistItems[payload.playlistID],
          payload.added,
          { at: 'end' },
        );
      })
      .addCase(UPDATE_MEDIA_START, (state, { payload }: AnyAction) => {
        for (const item of state.playlistItems[payload.playlistID]) {
          if (item != null && item._id === payload.mediaID) {
            item.loading = true;
          }
        }
      })
      .addCase(UPDATE_MEDIA_COMPLETE, (state, { payload }: AnyAction) => {
        for (const item of state.playlistItems[payload.playlistID]) {
          if (item != null && item._id === payload.mediaID) {
            item.loading = false;
            Object.assign(item, payload.media);
          }
        }
      })
      .addCase(movePlaylistItems.pending, (state, action) => {
        const { playlistID, medias } = action.meta.arg;
        const ids = new Set(medias.map((media) => media._id));
        for (const item of state.playlistItems[playlistID]) {
          if (item != null && ids.has(item._id)) {
            item.loading = true;
          }
        }
      })
      .addCase(movePlaylistItems.fulfilled, (state, action) => {
        const { playlistID, medias } = action.meta.arg;
        const { location } = action.payload;
        state.playlistItems[playlistID] = processMove(
          state.playlistItems[playlistID],
          medias,
          location,
        );
      })
      .addCase(removePlaylistItems.pending, (state, action) => {
        const { playlistID, medias } = action.meta.arg;
        const ids = new Set(medias.map((media) => media._id));
        for (const item of state.playlistItems[playlistID]) {
          if (item != null && ids.has(item._id)) {
            item.loading = true;
          }
        }
      })
      .addCase(removePlaylistItems.fulfilled, (state, action) => {
        const { playlistID, medias } = action.meta.arg;
        const { newSize } = action.payload;
        const ids = new Set(medias.map((media) => media._id));
        state.playlists[playlistID].size = newSize;
        state.playlistItems[playlistID] = state.playlistItems[playlistID]
          .filter((media) => media === null || !ids.has(media._id));
      });
  },
});

export {
  createPlaylist,
  renamePlaylist,
  activatePlaylist,
  movePlaylistItems,
  removePlaylistItems,
};
export const {
  selectPlaylist,
  showImportPanel,
  showSearchResults,
} = slice.actions;

export default slice.reducer;
