import { type PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import escapeStringRegExp from 'escape-string-regexp';
import indexBy from 'just-index';
import naturalCmp from 'natural-compare';
import { createAsyncThunk } from '../redux/api';
import uwFetch, { type ListResponse } from '../utils/fetch';
import mergeIncludedModels from '../utils/mergeIncludedModels';
import { favorite, type Media } from './booth';
import { initState, logout } from './auth';

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

interface ApiMedia {
  _id: string;
  sourceID: string;
  sourceType: string;
  sourceData: object;
  artist: string;
  title: string;
  thumbnail: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
}
/** TODO don't export? */
export interface ApiPlaylistItemMerged {
  _id: string;
  artist: string;
  title: string;
  start: number;
  end: number;
  media: ApiMedia;
  createdAt: string;
  updatedAt: string;
}

/** TODO remove */
function flattenPlaylistItem(item: ApiPlaylistItemMerged): PlaylistItem {
  return {
    ...item.media,
    ...item,
  };
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

function getPlaylistItems(
  playlistItems: Record<string, PlaylistItemList>,
  playlist: Playlist,
): PlaylistItemList {
  return playlistItems[playlist._id] ?? Array(playlist.size).fill(null);
}

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
  return list.toSpliced(insertIdx, 0, ...insert);
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
    // `size` should be the most recent value here
    // so we should not keep around cached playlist items that exceed the new playlist size
    if (i >= media.length) {
      return;
    }
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

  return response.data satisfies Playlist;
});

const deletePlaylist = createAsyncThunk('playlists/delete', async (playlistID: string) => {
  await uwFetch([`/playlists/${playlistID}`, {
    method: 'delete',
  }]);
});

const MEDIA_PAGE_SIZE = 50;
// `sneaky` disables loading indicators.
const loadPlaylist = createAsyncThunk('playlists/media', async ({
  playlistID,
  page = 0,
  filter = null,
}: {
  playlistID: string,
  page?: number,
  filter?: string | null,
  sneaky?: boolean,
}) => {
  const response = await uwFetch<{
    data: object[],
    meta: {
      offset: number,
      pageSize: number,
      results?: number,
      total: number,
    },
    included: object,
  }>([`/playlists/${playlistID}/media`, {
    method: 'get',
    qs: {
      // Empty string should not actually filter.
      filter: filter || null,
      page,
      limit: MEDIA_PAGE_SIZE,
    },
  }]);

  const items: ApiPlaylistItemMerged[] = mergeIncludedModels(response);
  return {
    items: items.map(flattenPlaylistItem),
    page: response.meta.offset / response.meta.pageSize,
    pageSize: response.meta.pageSize,
    size: response.meta.results ?? response.meta.total,
  };
}, {
  getPendingMeta({ arg }) {
    return { sneaky: arg.sneaky };
  },
});

function shouldLoadAfterCycle(playlist: Playlist, items: PlaylistItemList) {
  // If the playlist was fully loaded, we can cycle naively
  if (items.length === playlist.size && items.every(Boolean)) {
    return false;
  }
  // If the first page _after_ cycle is fully loaded, we also don't need to do
  // anything.
  if (items.length > MEDIA_PAGE_SIZE
      && items.slice(1, 1 + MEDIA_PAGE_SIZE).every(Boolean)) {
    return false;
  }
  // Otherwise, there will be unloaded items on the first page after cycling,
  // so we want to eagerly load the page again.
  return true;
}

const cyclePlaylist = createAsyncThunk('playlists/cycle', async (playlistID: string, api) => {
  const { playlists: state } = api.getState();
  if (playlistID === state.activePlaylistID || playlistID === state.selectedPlaylistID) {
    const playlist = state.playlists[playlistID];
    const items = state.playlistItems[playlistID];
    if (playlist && items && shouldLoadAfterCycle(playlist, items)) {
      await api.dispatch(loadPlaylist({ playlistID, page: 0 }));
    }
  }
});

const shufflePlaylist = createAsyncThunk('playlists/shuffle', async (playlistID: string, api) => {
  await uwFetch([`/playlists/${playlistID}/shuffle`, {
    method: 'post',
  }]);

  await api.dispatch(loadPlaylist({ playlistID, page: 0, sneaky: true }));
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

export type InsertTarget = { before: string } | { after: string } | { at: 'start' | 'end' };
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
    return { at: 'end' as const };
  }
  return { at: opts.at };
}

export interface NewPlaylistItem {
  sourceType: string;
  sourceID: string;
  /** Leave empty to use global default for this media. */
  artist?: string | undefined;
  /** Leave empty to use global default for this media. */
  title?: string | undefined;
  start: number;
  end: number;
}

/**
 * Keep only the playlist item properties that are necessary to add an item to
 * a playlist. The rest ("thumbnail" etc) is left out for smaller payloads.
 */
function minimizePlaylistItem(item: NewPlaylistItem) {
  return {
    sourceType: item.sourceType,
    sourceID: item.sourceID,
    artist: item.artist,
    title: item.title,
    start: item.start,
    end: item.end,
  };
}

const addPlaylistItems = createAsyncThunk('playlists/addPlaylistItems', async ({
  playlistID,
  items,
  afterID = null,
}: {
  playlistID: string,
  items: NewPlaylistItem[],
  afterID?: string | null,
}) => {
  const payload = {
    items: items.map(minimizePlaylistItem),
    after: afterID,
  };

  const response = await uwFetch<ListResponse<object> & {
    meta: {
      playlistSize: number,
    },
  }>([`/playlists/${playlistID}/media`, {
    method: 'post',
    data: payload,
  }]);

  const newItems: ApiPlaylistItemMerged[] = mergeIncludedModels(response);

  return {
    playlistSize: response.meta.playlistSize,
    items: newItems.map(flattenPlaylistItem),
  };
});

const movePlaylistItems = createAsyncThunk('playlists/movePlaylistItems', async ({ playlistID, medias, target }: {
  playlistID: string,
  medias: PlaylistItem[],
  target: InsertTarget,
}, api) => {
  const state = api.getState().playlists;
  const playlist = state.playlists[playlistID];
  if (playlist == null) {
    throw new Error('Attempt to move items in an unknown playlist');
  }
  const playlistItems = getPlaylistItems(state.playlistItems, playlist);
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

type PlaylistItemUpdate = {
    artist: string,
    title: string,
    start: number,
    end: number,
}
const updatePlaylistItem = createAsyncThunk('playlists/updatePlaylistItem', async ({
  playlistID,
  mediaID,
  props,
}: {
  playlistID: string,
  mediaID: string,
  props: PlaylistItemUpdate,
}) => {
  const { data } = await uwFetch<{
    data: PlaylistItemUpdate,
  }>([`/playlists/${playlistID}/media/${mediaID}`, {
    method: 'put',
    data: props,
  }]);

  return data;
});

function byName(a: Playlist, b: Playlist) {
  return naturalCmp(a.name.toLowerCase(), b.name.toLowerCase());
}

const slice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    selectActivePlaylist(state) {
      if (state.activePlaylistID !== state.selectedPlaylistID) {
        state.currentFilter = null;
        state.selectedPlaylistID = state.activePlaylistID;
      }
    },
    selectPlaylist(state, action: PayloadAction<string>) {
      if (state.currentFilter && state.currentFilter.playlistID !== action.payload) {
        state.currentFilter = null;
      }
      state.selectedPlaylistID = action.payload;
    },
    setPlaylistFilter(state, action: PayloadAction<{ playlistID: string, filter: string | null }>) {
      const { payload } = action;
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
        items: filterCachedPlaylistItems(state, payload.playlistID, payload.filter).concat(null),
      };
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
          state.playlists = indexBy(payload.playlists, '_id');
          // Preload the first item in the active playlist so it can be shown in
          // the footer bar immediately. Else it would flash "This playlist is empty"
          // for a moment.
          if (payload.activePlaylist) {
            const activePlaylist = state.playlists[payload.activePlaylist];
            // Probably overly defensive, but avoid a crash if we got inconsistent data
            const size = activePlaylist ? activePlaylist.size : 1;
            state.playlistItems[payload.activePlaylist] ??= Array(size).fill(null);
            if (payload.firstActivePlaylistItem) {
              state.playlistItems[payload.activePlaylist]![0] = {
                ...payload.firstActivePlaylistItem.media,
                ...payload.firstActivePlaylistItem,
              };
            }
          }
          state.activePlaylistID = payload.activePlaylist;
          // Select the first playlist by default if there is no active playlist.
          state.selectedPlaylistID ??= payload.activePlaylist ?? payload.playlists[0]?._id ?? null;
        }
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(activatePlaylist.pending, (state, action) => {
        const playlist = state.playlists[action.meta.arg];
        if (playlist != null) {
          playlist.loading = true;
        }
      })
      .addCase(activatePlaylist.rejected, (state, action) => {
        const playlist = state.playlists[action.meta.arg];
        if (playlist != null) {
          playlist.loading = false;
        }
      })
      .addCase(activatePlaylist.fulfilled, (state, action) => {
        const playlist = state.playlists[action.meta.arg];
        if (playlist != null) {
          playlist.loading = false;
          state.activePlaylistID = action.meta.arg;
        }
      })
      .addCase(loadPlaylist.pending, (state, action) => {
        const {
          playlistID, page = 0, sneaky = false, filter,
        } = action.meta.arg;
        const playlist = state.playlists[playlistID];
        if (playlist == null) {
          return;
        }
        // Cases where we don't show the whole playlist as loading
        if (sneaky || page !== 0 || filter || state.playlistItems[playlistID]) {
          return;
        }

        const items = state.playlistItems[playlistID] ?? [];
        state.playlistItems[playlistID] = Array(playlist.size).fill(null)
          .map((item, index) => items[index] ?? item);
      })
      .addCase(loadPlaylist.fulfilled, (state, action) => {
        const {
          items, size, page, pageSize,
        } = action.payload;
        const { playlistID, filter } = action.meta.arg;
        const playlist = state.playlists[playlistID];

        if (playlist == null) {
          return;
        }

        // A response came in for an outdated filter
        if (filter && (state.currentFilter == null || state.currentFilter.filter !== filter)) {
          return;
        }

        playlist.loading = false;
        if (filter && state.currentFilter) {
          state.currentFilter.items = mergePlaylistPage(
            size,
            state.currentFilter.items,
            items,
            { page, pageSize },
          );
        } else {
          state.playlistItems[playlistID] = mergePlaylistPage(
            size,
            state.playlistItems[playlistID],
            items,
            { page, pageSize },
          );
        }
      })
      .addCase(cyclePlaylist.pending, (state, { meta }) => {
        const playlist = state.playlists[meta.arg];
        if (playlist == null) {
          return;
        }

        const items = state.playlistItems[meta.arg] ?? [];
        if (items.length > 0) {
          const newItems = items.slice(1);
          // eslint-disable-next-line prefer-destructuring
          newItems[playlist.size - 1] = items[0] ?? null;
          state.playlistItems[meta.arg] = newItems;
        }
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
      .addCase(deletePlaylist.pending, (state, { meta }) => {
        const playlist = state.playlists[meta.arg];

        if (playlist != null) {
          playlist.loading = true;
        }
      })
      .addCase(deletePlaylist.fulfilled, (state, { meta }) => {
        const playlistID = meta.arg;
        const playlist = state.playlists[playlistID];
        if (playlist == null) {
          return;
        }

        playlist.loading = false;
        delete state.playlists[playlistID];
        delete state.playlistItems[playlistID];

        if (state.selectedPlaylistID === playlistID) {
          state.selectedPlaylistID = state.activePlaylistID;
        }
      })
      .addCase(deletePlaylist.rejected, (state, { meta }) => {
        const playlist = state.playlists[meta.arg];
        if (playlist != null) {
          playlist.loading = false;
        }
      })
      .addCase(addPlaylistItems.pending, (state, action) => {
        const { playlistID } = action.meta.arg;
        const playlist = state.playlists[playlistID];

        if (playlist != null) {
          playlist.loading = true;
        }
      })
      .addCase(addPlaylistItems.fulfilled, (state, action) => {
        const { playlistID, afterID = null } = action.meta.arg;
        const { playlistSize, items } = action.payload;

        const playlist = state.playlists[playlistID];
        if (playlist == null) {
          return;
        }
        playlist.loading = false;
        playlist.size = playlistSize;

        const playlistItems = state.playlistItems[playlistID];
        if (playlistItems == null) {
          return;
        }

        state.playlistItems[playlistID] = processInsert(playlistItems, items, { after: afterID });
      })
      .addCase(favorite.fulfilled, (state, action) => {
        const { payload } = action;
        const { playlistID } = action.meta.arg;
        const playlist = state.playlists[playlistID];
        if (playlist == null) {
          return;
        }
        playlist.size = payload.playlistSize;

        const playlistItems = state.playlistItems[playlistID];
        if (playlistItems == null) {
          return;
        }
        state.playlistItems[playlistID] = processInsert(playlistItems, payload.added, { at: 'end' });
      })
      .addCase(updatePlaylistItem.pending, (state, { meta }) => {
        const playlistItems = state.playlistItems[meta.arg.playlistID];
        if (playlistItems == null) {
          return;
        }
        for (const item of playlistItems) {
          if (item != null && item._id === meta.arg.mediaID) {
            item.loading = true;
          }
        }
      })
      .addCase(updatePlaylistItem.fulfilled, (state, { payload, meta }) => {
        const playlistItems = state.playlistItems[meta.arg.playlistID];
        if (playlistItems == null) {
          return;
        }
        for (const item of playlistItems) {
          if (item != null && item._id === meta.arg.mediaID) {
            item.loading = false;
            Object.assign(item, payload);
          }
        }
      })
      .addCase(updatePlaylistItem.rejected, (state, { meta }) => {
        const playlistItems = state.playlistItems[meta.arg.playlistID];
        if (playlistItems == null) {
          return;
        }
        // Just remove the loading state
        for (const item of playlistItems) {
          if (item != null && item._id === meta.arg.mediaID) {
            item.loading = false;
          }
        }
      })
      .addCase(movePlaylistItems.pending, (state, action) => {
        const { playlistID, medias } = action.meta.arg;
        const playlistItems = state.playlistItems[playlistID];
        if (playlistItems == null) {
          return;
        }
        const ids = new Set(medias.map((media) => media._id));
        for (const item of playlistItems) {
          if (item != null && ids.has(item._id)) {
            item.loading = true;
          }
        }
      })
      .addCase(movePlaylistItems.fulfilled, (state, action) => {
        const { playlistID, medias } = action.meta.arg;
        const { location } = action.payload;
        const playlist = state.playlists[playlistID];
        if (playlist != null) {
          state.playlistItems[playlistID] = processMove(
            getPlaylistItems(state.playlistItems, playlist),
            medias,
            location,
          );
        }
      })
      .addCase(removePlaylistItems.pending, (state, action) => {
        const { playlistID, medias } = action.meta.arg;
        const playlistItems = state.playlistItems[playlistID];
        if (playlistItems == null) {
          return;
        }
        const ids = new Set(medias.map((media) => media._id));
        for (const item of playlistItems) {
          if (item != null && ids.has(item._id)) {
            item.loading = true;
          }
        }
      })
      .addCase(removePlaylistItems.fulfilled, (state, action) => {
        const { playlistID, medias } = action.meta.arg;
        const { newSize } = action.payload;
        const playlist = state.playlists[playlistID];
        if (playlist == null) {
          return;
        }

        const ids = new Set(medias.map((media) => media._id));
        playlist.size = newSize;
        state.playlistItems[playlistID] = getPlaylistItems(state.playlistItems, playlist)
          .filter((media) => media === null || !ids.has(media._id));
      });
  },
  selectors: {
    base: (state) => state,
  },
});

const baseSelector = slice.selectors.base;
type RootState = Parameters<typeof baseSelector>[0];
export const playlistsByIDSelector = createSelector([baseSelector], (state) => {
  return Object.fromEntries(
    Object.entries(state.playlists)
      .map(([id, playlist]) => [
        id,
        playlist._id === state.activePlaylistID ? { ...playlist, active: true } : playlist,
      ]),
  );
});
export const playlistSelector = (state: RootState, id: string) => {
  return playlistsByIDSelector(state)[id] ?? null;
};
export const playlistsSelector = createSelector([playlistsByIDSelector], (playlists) => {
  return Object.values(playlists).sort(byName);
});
export const playlistItemsSelector = createSelector(
  [
    (state: RootState, id: string) => state.playlists.playlists[id],
    (state: RootState, id: string) => state.playlists.playlistItems[id],
  ],
  (playlist, playlistItems) => {
    if (playlist != null) {
      return playlistItems ?? Array(playlist.size).fill(null);
    }
    return null;
  },
);
export const activePlaylistIDSelector = (state: RootState) => state.playlists.activePlaylistID;
export const selectedPlaylistIDSelector = (state: RootState) => state.playlists.selectedPlaylistID;
export const activePlaylistSelector = (state: RootState) => {
  const activePlaylistID = activePlaylistIDSelector(state);
  return activePlaylistID ? playlistSelector(state, activePlaylistID) : null;
};
export const selectedPlaylistSelector = (state: RootState) => {
  const selectedPlaylistID = selectedPlaylistIDSelector(state);
  return typeof selectedPlaylistID === 'string' ? playlistSelector(state, selectedPlaylistID) : null;
};
export const activePlaylistItemsSelector = (state: RootState) => {
  const { activePlaylistID } = state.playlists;
  return typeof activePlaylistID === 'string'
    ? playlistItemsSelector(state, activePlaylistID)
    : null;
};
export const selectedPlaylistItemsSelector = (state: RootState) => {
  const { selectedPlaylistID } = state.playlists;
  return typeof selectedPlaylistID === 'string'
    ? playlistItemsSelector(state, selectedPlaylistID)
    : null;
};
export const playlistItemFilterSelector = (state: RootState) => {
  return state.playlists.currentFilter?.filter;
};
export const filteredSelectedPlaylistItemsSelector = (state: RootState) => {
  const { selectedPlaylistID, currentFilter } = state.playlists;
  if (typeof selectedPlaylistID !== 'string') {
    return null;
  }
  return currentFilter?.items ?? playlistItemsSelector(state, selectedPlaylistID);
};
export const nextMediaSelector = (state: RootState): PlaylistItem | null => {
  return activePlaylistItemsSelector(state)?.[0] ?? null;
};

export {
  createPlaylist,
  deletePlaylist,
  loadPlaylist,
  cyclePlaylist,
  shufflePlaylist,
  renamePlaylist,
  activatePlaylist,
  addPlaylistItems,
  movePlaylistItems,
  removePlaylistItems,
  updatePlaylistItem,
};
export const {
  selectPlaylist,
  selectActivePlaylist,
  setPlaylistFilter,
  showImportPanel,
  showSearchResults,
} = slice.actions;
export default slice.reducer;
