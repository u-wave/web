import { createSelector, createStructuredSelector } from 'reselect';
import naturalCmp from 'natural-compare';
import values from 'object-values';

const byName = (a, b) => naturalCmp(a.name.toLowerCase(), b.name.toLowerCase());

const baseSelector = state => state.playlists;

export const playlistsSelector = createSelector(
  baseSelector,
  playlists => values(playlists.playlists).sort(byName)
);

export const activePlaylistIDSelector = createSelector(
  baseSelector,
  playlists => playlists.activePlaylistID
);

export const activePlaylistSelector = createSelector(
  baseSelector,
  activePlaylistIDSelector,
  (playlists, activeID) => playlists.playlists[activeID]
);

export const selectedPlaylistIDSelector = createSelector(
  baseSelector,
  playlists => playlists.selectedPlaylistID
);

const selectedPlaylistSelector = createSelector(
  baseSelector,
  selectedPlaylistIDSelector,
  (playlists, selectedID) => playlists.playlists[selectedID]
);

const activeMediaSelector = createSelector(
  baseSelector,
  playlists => playlists.activeMedia
);

const selectedMediaSelector = createSelector(
  baseSelector,
  playlists => playlists.selectedMedia
);

export const nextMediaSelector = createSelector(
  activeMediaSelector,
  media => media ? media[0] : null
);

export const playlistsIndexSelector = createStructuredSelector({
  playlists: playlistsSelector,
  activePlaylist: activePlaylistSelector,
  selectedPlaylist: selectedPlaylistSelector,
  activeMedia: activeMediaSelector,
  selectedMedia: selectedMediaSelector
});
