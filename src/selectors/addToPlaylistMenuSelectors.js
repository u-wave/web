import { createSelector, createStructuredSelector } from 'reselect';
import { playlistsSelector } from './playlistSelectors';

const baseSelector = state => state.addToPlaylistMenu;
export const isOpenSelector = createSelector(baseSelector, menu => menu.open);
export const positionSelector = createSelector(baseSelector, menu => menu.position);
const typeSelector = createSelector(baseSelector, menu => menu.type);
const dataSelector = createSelector(baseSelector, menu => menu.data);

export const isFavoriteSelector = createSelector(typeSelector, type => type === 'favorite');

export const mediaSelector = createSelector(
  dataSelector,
  isOpenSelector,
  isFavoriteSelector,
  (data, isOpen, isFavorite) => (isOpen && !isFavorite ? data.media : null),
);
export const historyIDSelector = createSelector(
  dataSelector,
  isOpenSelector,
  isFavoriteSelector,
  (data, isOpen, isFavorite) => (isOpen && isFavorite ? data.historyID : null),
);

export const addToPlaylistMenuSelector = createStructuredSelector({
  type: typeSelector,
  open: isOpenSelector,
  position: positionSelector,
  playlists: playlistsSelector,
});
