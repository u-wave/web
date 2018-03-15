import { createSelector } from 'reselect';
import naturalCmp from 'natural-compare';
import values from 'object-values';

const byName = (a, b) => naturalCmp(a.name.toLowerCase(), b.name.toLowerCase());

const baseSelector = state => state.playlists;

export const playlistsSelector = createSelector(
  baseSelector,
  playlists => values(playlists.playlists).sort(byName),
);

export const playlistItemsSelector = createSelector(
  baseSelector,
  playlists => playlists.playlistItems,
);

export const activePlaylistIDSelector = createSelector(
  baseSelector,
  playlists => playlists.activePlaylistID,
);

const activeMediaSelector = createSelector(
  playlistItemsSelector,
  activePlaylistIDSelector,
  (playlistItems, activePlaylist) => playlistItems[activePlaylist] || [],
);

function mergePlaylistItems(playlist, playlistItems) {
  if (playlist) {
    return {
      ...playlist,
      media: playlistItems,
    };
  }
  return null;
}

export const activePlaylistSelector = createSelector(
  baseSelector,
  activePlaylistIDSelector,
  activeMediaSelector,
  (playlists, activeID, activeMedia) =>
    mergePlaylistItems(playlists.playlists[activeID], activeMedia),
);

export const selectedPlaylistIDSelector = createSelector(
  baseSelector,
  playlists => playlists.selectedPlaylistID,
);

const selectedMediaSelector = createSelector(
  playlistItemsSelector,
  selectedPlaylistIDSelector,
  (playlistItems, selectedPlaylist) => playlistItems[selectedPlaylist] || [],
);

const filterSelector = createSelector(
  baseSelector,
  base => base.currentFilter,
);

const currentFilterSelector = createSelector(
  filterSelector,
  selectedPlaylistIDSelector,
  (filter, selectedID) => {
    if (filter && filter.playlistID === selectedID) {
      return filter;
    }
    return null;
  },
);

export const playlistItemFilterSelector = createSelector(
  currentFilterSelector,
  filter => filter && filter.filter,
);

export const filteredSelectedPlaylistItemsSelector = createSelector(
  selectedPlaylistIDSelector,
  selectedMediaSelector,
  currentFilterSelector,
  (selectedID, selectedItems, filter) => {
    if (filter) {
      return filter.items;
    }
    return selectedItems;
  },
);

export const selectedPlaylistSelector = createSelector(
  baseSelector,
  selectedPlaylistIDSelector,
  selectedMediaSelector,
  (playlists, selectedID, selectedMedia) =>
    mergePlaylistItems(playlists.playlists[selectedID], selectedMedia),
);

export const nextMediaSelector = createSelector(
  activeMediaSelector,
  media => (media ? media[0] : null),
);

export const isSelectedPlaylistLoadingSelector = createSelector(
  selectedPlaylistSelector,
  selectedPlaylist => Boolean(selectedPlaylist.loading),
);

export const isFilteredSelector = createSelector(
  playlistItemFilterSelector,
  filter => Boolean(filter),
);
