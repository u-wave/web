import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import {
  openPreviewMediaDialog
} from '../actions/DialogActionCreators';
import {
  showImportPanel
} from '../actions/ImportActionCreators';
import {
  addMedia,
  addMediaMenu,
  editMedia,
  moveMedia,
  removeMedia,
  filterPlaylistItems,
  createPlaylist,
  renamePlaylist,
  deletePlaylist,
  cannotDeleteActivePlaylist,
  shufflePlaylist,
  activatePlaylist,
  selectPlaylist,
  loadPlaylist,
  loadFilteredPlaylistItems
} from '../actions/PlaylistActionCreators';
import {
  search,
  showSearchResults,
  setSource as setSearchSource
} from '../actions/SearchActionCreators';

import { playlistsIndexSelector } from '../selectors/playlistSelectors';
import { searchSelector } from '../selectors/searchSelectors';
import { showImportPanelSelector } from '../selectors/importSelectors';
import PlaylistManager from '../components/PlaylistManager';

const mapStateToProps = createSelector(
  playlistsIndexSelector,
  searchSelector,
  showImportPanelSelector,
  (playlists, mediaSearch, showingImportPanel) => ({
    ...playlists,
    ...mediaSearch,
    showImportPanel: showingImportPanel
  })
);

const selectionOrOne = (media, selection) => {
  if (selection.isSelected(media)) {
    return selection.get();
  }
  return [ media ];
};

const onOpenAddMediaMenu = (position, media, selection) =>
  addMediaMenu(selectionOrOne(media, selection), position);
const onRemoveFromPlaylist = (playlist, media, selection) =>
  removeMedia(playlist, selectionOrOne(media, selection));
const onMoveToFirst = (playlist, media, selection) =>
  moveMedia(playlist, selectionOrOne(media, selection), { at: 'start' });
const onEditMedia = (playlist, media) =>
  editMedia(playlist, media);

const onMoveMedia = (playlist, media, opts) =>
  moveMedia(playlist, media, opts);

const mapDispatchToProps = dispatch => bindActionCreators({
  onOpenAddMediaMenu,
  onMoveToFirst,
  onEditMedia,
  onMoveMedia,
  onRemoveFromPlaylist,
  onOpenPreviewMediaDialog: openPreviewMediaDialog,
  onAddToPlaylist: addMedia,
  onCreatePlaylist: createPlaylist,
  onRenamePlaylist: renamePlaylist,
  onDeletePlaylist: deletePlaylist,
  onNotDeletable: cannotDeleteActivePlaylist,
  onShufflePlaylist: shufflePlaylist,
  onActivatePlaylist: activatePlaylist,
  onFilterPlaylistItems: filterPlaylistItems,
  onSelectPlaylist: selectPlaylist,
  onSelectSearchResults: showSearchResults,
  onLoadPlaylistPage: loadPlaylist,
  onLoadFilteredPlaylistPage: loadFilteredPlaylistItems,
  onSearchSubmit: search,
  onSearchSourceChange: setSearchSource,
  onShowImportPanel: showImportPanel
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistManager);
