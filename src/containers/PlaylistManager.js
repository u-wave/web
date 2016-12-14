import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import {
  openPreviewMediaDialog
} from '../actions/DialogActionCreators';
import {
  addMediaMenu
} from '../actions/PlaylistActionCreators';
import {
  search,
  setSource as setSearchSource
} from '../actions/SearchActionCreators';

import { selectedPlaylistSelector } from '../selectors/playlistSelectors';
import { searchSelector } from '../selectors/searchSelectors';
import { showImportPanelSelector } from '../selectors/importSelectors';
import PlaylistManager from '../components/PlaylistManager';

const mapStateToProps = createSelector(
  selectedPlaylistSelector,
  searchSelector,
  showImportPanelSelector,
  (selectedPlaylist, mediaSearch, showImportPanel) => ({
    ...mediaSearch,
    selectedPlaylist,
    showImportPanel
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

const mapDispatchToProps = dispatch => bindActionCreators({
  onOpenAddMediaMenu,
  onOpenPreviewMediaDialog: openPreviewMediaDialog,
  onSearchSubmit: search,
  onSearchSourceChange: setSearchSource
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistManager);
