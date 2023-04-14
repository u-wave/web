import type { AnyAction } from 'redux';
import escapeStringRegExp from 'escape-string-regexp';
import indexBy from 'just-index';
import mapValues from 'just-map-values';
import omit from 'just-omit';
import { flattenPlaylistItem } from '../actions/PlaylistActionCreators';
import {
  LOAD_ALL_PLAYLISTS_COMPLETE,
  LOAD_PLAYLIST_START,
  LOAD_PLAYLIST_COMPLETE,
  PLAYLIST_CYCLED,
  SELECT_PLAYLIST,
  ACTIVATE_PLAYLIST_START,
  ACTIVATE_PLAYLIST_COMPLETE,
  CREATE_PLAYLIST_START,
  CREATE_PLAYLIST_COMPLETE,
  RENAME_PLAYLIST_COMPLETE,
  DELETE_PLAYLIST_START,
  DELETE_PLAYLIST_COMPLETE,
  ADD_MEDIA_START,
  ADD_MEDIA_COMPLETE,
  REMOVE_MEDIA_START,
  REMOVE_MEDIA_COMPLETE,
  MOVE_MEDIA_START,
  MOVE_MEDIA_COMPLETE,
  UPDATE_MEDIA_START,
  UPDATE_MEDIA_COMPLETE,
  FILTER_PLAYLIST_ITEMS,
  FILTER_PLAYLIST_ITEMS_COMPLETE,
  DO_FAVORITE_COMPLETE,

  SHOW_IMPORT_PANEL,
  SHOW_SEARCH_RESULTS,
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

function updatePlaylist(
  state: State,
  playlistID: string,
  modify: (playlist: Playlist) => Playlist,
) {
  const playlist = state.playlists[playlistID];
  if (playlist) {
    return {
      ...state,
      playlists: {
        ...state.playlists,
        [playlistID]: modify(playlist),
      },
    };
  }
  return state;
}

// Applies a function to the media list belonging to `playlistID` if it is found
// locally, i.e. in either the active or the selected playlist.
function updatePlaylistItems(
  state: State,
  playlistID: string,
  modify: (items: PlaylistItemList, playlist: Playlist) => PlaylistItemList,
) {
  const playlist = state.playlists[playlistID];
  const media = state.playlistItems[playlistID];
  if (playlist) {
    let nextFilter = state.currentFilter;
    if (state.selectedPlaylistID === playlistID && nextFilter) {
      nextFilter = {
        ...nextFilter,
        items: modify(nextFilter.items ?? [], playlist),
      };
    }
    return {
      ...state,
      playlistItems: {
        ...state.playlistItems,
        [playlistID]: modify(media ?? [], playlist),
      },
      currentFilter: nextFilter,
    };
  }
  return state;
}

function updatePlaylistAndItems(
  state: State,
  playlistID: string,
  modifyPlaylist: (playlist: Playlist) => Playlist,
  modifyItems: (items: PlaylistItemList, playlist: Playlist) => PlaylistItemList,
) {
  const newState = updatePlaylist(state, playlistID, modifyPlaylist);
  return updatePlaylistItems(newState, playlistID, modifyItems);
}

function setPlaylistLoading(state: State, id: string, loading = true) {
  return updatePlaylist(state, id, (playlist) => ({
    ...playlist,
    loading,
  }));
}

function mergePlaylistPage(
  size: number,
  oldMedia: PlaylistItemList,
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

export default function reduce(state = initialState, action: AnyAction): State {
  const {
    type, payload, meta, error,
  } = action;

  switch (type) {
    case initState.fulfilled.type:
      // Probably not signed in.
      if (!payload.playlists) return state;

      return {
        ...state,
        playlists: indexBy(payload.playlists.map((playlist: Playlist) => ({
          ...playlist,
          active: playlist._id === payload.activePlaylist,
        })), '_id'),
        // Preload the first item in the active playlist so it can be shown in
        // the footer bar immediately. Else it would flash "This playlist is empty"
        // for a moment.
        playlistItems: payload.activePlaylist && payload.firstActivePlaylistItem ? {
          ...state.playlistItems,
          [payload.activePlaylist]: [flattenPlaylistItem(payload.firstActivePlaylistItem)],
        } : state.playlistItems,
        activePlaylistID: payload.activePlaylist,
        selectedPlaylistID: payload.activePlaylist,
      };
    case LOAD_ALL_PLAYLISTS_COMPLETE:
      return {
        ...state,
        playlists: indexBy(payload.playlists, '_id'),
      };
    case ACTIVATE_PLAYLIST_START:
    // TODO use a different property here so we can show a loading icon on
    // the "Active" button only, instead of on top of the entire playlist
      return setPlaylistLoading(state, payload.playlistID);
    case ACTIVATE_PLAYLIST_COMPLETE:
      if (error) {
        return setPlaylistLoading(state, meta.playlistID, false);
      }

      return {
        ...state,
        // set `active` property on all playlists
        playlists: mapValues(state.playlists, (playlist) => ({
          ...playlist,
          loading: playlist._id === payload.playlistID ? false : playlist.loading,
          active: playlist._id === payload.playlistID,
        })),
        activePlaylistID: payload.playlistID,
      };
    case SELECT_PLAYLIST: {
      const { currentFilter } = state;
      const shouldClearFilter = currentFilter && currentFilter.playlistID !== payload.playlistID;
      return {
        ...state,
        currentFilter: shouldClearFilter ? null : currentFilter,
        selectedPlaylistID: payload.playlistID,
      };
    }
    case LOAD_PLAYLIST_START: {
      if (meta.sneaky || meta.page !== 0 || state.playlistItems[payload.playlistID]) {
        return state;
      }

      // Reserve space in the playlistItems array.
      return updatePlaylistItems(
        state,
        payload.playlistID,
        (items, playlist) => Array(playlist.size).fill(null)
          .map((item, i) => items[i] ?? item),
      );
    }
    case LOAD_PLAYLIST_COMPLETE:
      if (error) {
        return setPlaylistLoading(state, meta.playlistID, false);
      }

      return updatePlaylistAndItems(
        state,
        payload.playlistID,
        (playlist) => ({ ...playlist, loading: false }),
        (items) => mergePlaylistPage(meta.size, items, payload.media, meta),
      );

    case FILTER_PLAYLIST_ITEMS:
    // Only the selected playlist can be filtered.
      if (payload.playlistID !== state.selectedPlaylistID) {
        return state;
      }
      if (!payload.filter) {
        return {
          ...state,
          currentFilter: null,
        };
      }
      return {
        ...state,
        currentFilter: {
          playlistID: payload.playlistID,
          filter: payload.filter,
          items: filterCachedPlaylistItems(state, payload.playlistID, payload.filter),
        },
      };
    case FILTER_PLAYLIST_ITEMS_COMPLETE: {
      const { currentFilter } = state;
      // Only the selected playlist can be filtered.
      if (payload.playlistID !== state.selectedPlaylistID || !currentFilter) {
        return state;
      }
      const items = mergePlaylistPage(meta.size, currentFilter.items, payload.media, meta);
      return {
        ...state,
        currentFilter: { ...currentFilter, items },
      };
    }

    case PLAYLIST_CYCLED:
      return updatePlaylistItems(state, payload.playlistID, (items, playlist) => {
        const newItems = items.slice(1);
        newItems[playlist.size - 1] = items[0]; // eslint-disable-line prefer-destructuring
        return newItems;
      });

      // here be dragons
      // TODO find a simpler way to store this stuff, that doesn't involve keeping
      // millions of properties (six properties to be precise) in sync
      // Playlists that are being created have a temporary ID that is used until the
      // real ID comes back from the server.
    case CREATE_PLAYLIST_START: {
      const newPlaylist = {
        _id: meta.tempId,
        name: payload.name,
        description: payload.description,
        shared: payload.shared,
        creating: true,
      };
      return {
        ...state,
        playlists: {
          ...state.playlists,
          [meta.tempId]: newPlaylist,
        },
        selectedPlaylistID: meta.tempId,
      };
    }
    case CREATE_PLAYLIST_COMPLETE:
      if (error) {
        return {
          ...state,
          playlists: omit(state.playlists, `${meta.tempId}`),
        };
      }

      return {
        ...state,
        playlists: Object.assign(
          omit(state.playlists, `${meta.tempId}`),
          { [payload.playlist._id]: payload.playlist },
        ),
        selectedPlaylistID: payload.playlist._id,
      };

    case RENAME_PLAYLIST_COMPLETE: {
      if (error) {
        return state;
      }

      const renamedPlaylist = state.playlists[payload.playlistID];
      if (renamedPlaylist) {
        return updatePlaylist(state, payload.playlistID, (playlist) => ({
          ...playlist,
          name: payload.name,
        }));
      }
      return state;
    }
    case DELETE_PLAYLIST_START:
      return setPlaylistLoading(state, payload.playlistID);
    case DELETE_PLAYLIST_COMPLETE:
      if (error) {
        return setPlaylistLoading(state, meta.playlistID, false);
      }

      return {
        ...state,
        // When deleting the selected playlist, select the active playlist instead.
        selectedPlaylistID: state.selectedPlaylistID === payload.playlistID
          ? state.activePlaylistID
          : state.selectedPlaylistID,
        playlists: omit(state.playlists, payload.playlistID),
      };

    case ADD_MEDIA_START:
      return setPlaylistLoading(state, payload.playlistID);
    case ADD_MEDIA_COMPLETE:
      if (error) {
        return setPlaylistLoading(state, meta.playlistID, false);
      }

      return updatePlaylistAndItems(
        state,
        payload.playlistID,
        (playlist) => ({
          ...playlist,
          loading: false,
          size: payload.newSize,
        }),
        (items) => processInsert(items, payload.appendedMedia, { after: payload.afterID }),
      );
    case DO_FAVORITE_COMPLETE:
      return updatePlaylistAndItems(
        state,
        payload.playlistID,
        (playlist) => ({
          ...playlist,
          size: payload.newSize,
        }),
        (items) => processInsert(items, payload.added, { at: 'end' }),
      );

    case UPDATE_MEDIA_START:
      return updatePlaylistItems(state, payload.playlistID, (items) => (
        items.map((media) => (
          media && media._id === payload.mediaID
            ? { ...media, loading: true }
            : media
        ))
      ));
    case UPDATE_MEDIA_COMPLETE:
      return updatePlaylistItems(state, payload.playlistID, (items) => (
        items.map((media) => (
          media && media._id === payload.mediaID
            ? { ...media, ...payload.media, loading: false }
            : media
        ))
      ));

    case MOVE_MEDIA_START: {
      const isMovingMedia = indexBy(payload.medias, '_id');
      return updatePlaylistItems(state, payload.playlistID, (items) => (
        items.map((media) => media && ({
          ...media,
          loading: Boolean(isMovingMedia[media._id] || media.loading),
        }))
      ));
    }
    case MOVE_MEDIA_COMPLETE:
      return updatePlaylistItems(state, payload.playlistID, (items) => (
        processMove(items, payload.medias, payload.location)
      ));

    case REMOVE_MEDIA_START: {
      const isRemovingMedia = indexBy(payload.medias, '_id');
      return updatePlaylistItems(state, payload.playlistID, (items) => (
        items.map((media) => media && ({
          ...media,
          loading: Boolean(isRemovingMedia[media._id] || media.loading),
        }))
      ));
    }
    case REMOVE_MEDIA_COMPLETE: {
      const isRemovedMedia = indexBy(payload.removedMedia, '_id');
      return updatePlaylistAndItems(
        state,
        payload.playlistID,
        (playlist) => ({ ...playlist, size: payload.newSize }),
        (items) => items.filter((media) => media === null || !isRemovedMedia[media._id]),
      );
    }
    case SHOW_IMPORT_PANEL:
      return { ...state, selectedPlaylistID: importPanelSymbol };
    case SHOW_SEARCH_RESULTS:
      return { ...state, selectedPlaylistID: searchPanelSymbol };
    default:
      return state;
  }
}
