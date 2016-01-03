import { createSelector, createStructuredSelector } from 'reselect';
import { playlistsSelector } from './playlistSelectors';

const baseSelector = state => state.addToPlaylistMenu;
const isOpenSelector = createSelector(baseSelector, menu => menu.open);
const positionSelector = createSelector(baseSelector, menu => menu.position);
const mediaSelector = createSelector(baseSelector, menu => menu.media);

export const addToPlaylistMenuSelector = createStructuredSelector({
  open: isOpenSelector,
  position: positionSelector,
  playlists: playlistsSelector,
  media: mediaSelector
});
