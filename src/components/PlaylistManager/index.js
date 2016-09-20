import cx from 'classnames';
import React, { Component, PropTypes } from 'react';

import { IDLE, LOADING, LOADED } from '../../constants/LoadingStates';
import Overlay from '../Overlay';

import PlaylistMenu from './Menu';
import PlaylistHeader from './Header';
import PlaylistPanel from './Panel';
import PlaylistPanelEmpty from './Panel/Empty';
import PlaylistImport from '../../containers/PlaylistImportManager';
import SearchResults from './Panel/SearchResults';

export default class PlaylistManager extends Component {
  static propTypes = {
    className: PropTypes.string,

    playlists: PropTypes.array,
    activePlaylist: PropTypes.object,
    selectedPlaylist: PropTypes.object,
    selectedMedia: PropTypes.array,
    currentFilter: PropTypes.string,

    showSearchResults: PropTypes.bool.isRequired,
    showImportPanel: PropTypes.bool.isRequired,

    searchSource: PropTypes.string,
    searchQuery: PropTypes.string,
    searchResults: PropTypes.array,
    searchLoadingState: PropTypes.oneOf([ IDLE, LOADING, LOADED ]),

    onCloseOverlay: PropTypes.func,
    onCreatePlaylist: PropTypes.func,
    onRenamePlaylist: PropTypes.func,
    onDeletePlaylist: PropTypes.func,
    onNotDeletable: PropTypes.func,
    onShufflePlaylist: PropTypes.func,
    onActivatePlaylist: PropTypes.func,
    onFilterPlaylistItems: PropTypes.func,
    onSelectPlaylist: PropTypes.func,
    onSelectSearchResults: PropTypes.func,
    onSearchSubmit: PropTypes.func,
    onSearchSourceChange: PropTypes.func,
    onShowImportPanel: PropTypes.func,
    onAddToPlaylist: PropTypes.func,
    onOpenAddMediaMenu: PropTypes.func,
    onMoveToFirst: PropTypes.func,
    onEditMedia: PropTypes.func,
    onMoveMedia: PropTypes.func,
    onRemoveFromPlaylist: PropTypes.func,
    onOpenPreviewMediaDialog: PropTypes.func,
    onLoadPlaylistPage: PropTypes.func,
    onLoadFilteredPlaylistPage: PropTypes.func
  };

  withSelected(fn) {
    const selectedPlaylist = this.props.selectedPlaylist;
    if (selectedPlaylist) {
      fn(selectedPlaylist);
    }
  }

  handleShufflePlaylist = () => {
    this.withSelected(selectedPlaylist =>
      this.props.onShufflePlaylist(selectedPlaylist._id)
    );
  };

  handleMoveToFirst = (media, selection) => {
    this.withSelected(selectedPlaylist =>
      this.props.onMoveToFirst(selectedPlaylist._id, media, selection)
    );
  };

  handleEditMedia = (media) => {
    this.withSelected(selectedPlaylist =>
      this.props.onEditMedia(selectedPlaylist._id, media)
    );
  };

  handleMoveMedia = (media, opts) => {
    this.withSelected(selectedPlaylist =>
      this.props.onMoveMedia(selectedPlaylist._id, media, opts)
    );
  };

  handleRemoveFromPlaylist = (media, selection) => {
    this.withSelected(selectedPlaylist =>
      this.props.onRemoveFromPlaylist(selectedPlaylist._id, media, selection)
    );
  };

  handleLoadPlaylistPage = (page) => {
    const loadPlaylistPage = this.props.currentFilter ?
      this.props.onLoadFilteredPlaylistPage : this.props.onLoadPlaylistPage;
    this.withSelected(selectedPlaylist =>
      loadPlaylistPage(selectedPlaylist._id, page)
    );
  };

  handleFilterPlaylistItems = (filter) => {
    this.withSelected(selectedPlaylist =>
      this.props.onFilterPlaylistItems(selectedPlaylist._id, filter)
    );
  };

  handleSelectPlaylist = (playlist) => {
    this.props.onSelectPlaylist(playlist._id);
  };

  render() {
    const {
      playlists,
      activePlaylist,
      selectedPlaylist,
      selectedMedia,
      currentFilter,

      showSearchResults,
      showImportPanel,

      searchSource,
      searchQuery,
      searchResults,
      searchLoadingState,

      onCloseOverlay,
      onCreatePlaylist,
      onDeletePlaylist,
      onNotDeletable,
      onAddToPlaylist,
      onActivatePlaylist,
      onRenamePlaylist,
      onSelectSearchResults,
      onSearchSubmit,
      onSearchSourceChange,
      onShowImportPanel,

      onOpenPreviewMediaDialog,
      onOpenAddMediaMenu
    } = this.props;

    let panel;
    if (showImportPanel) {
      panel = (
        <div className="PlaylistPanel PlaylistManager-panel">
          <PlaylistImport />
        </div>
      );
    } else if (showSearchResults) {
      panel = (
        <SearchResults
          className="PlaylistManager-panel"
          query={searchQuery}
          results={searchResults}
          loadingState={searchLoadingState}
          onOpenPreviewMediaDialog={onOpenPreviewMediaDialog}
          onOpenAddMediaMenu={onOpenAddMediaMenu}
        />
      );
    } else if (selectedPlaylist) {
      panel = (
        <PlaylistPanel
          className="PlaylistManager-panel"
          playlist={selectedPlaylist}
          media={selectedMedia}
          loading={!!selectedPlaylist.loading}
          isFiltered={!!currentFilter}
          onShufflePlaylist={this.handleShufflePlaylist}
          onActivatePlaylist={onActivatePlaylist}
          onRenamePlaylist={onRenamePlaylist}
          onDeletePlaylist={onDeletePlaylist}
          onNotDeletable={onNotDeletable}
          onOpenPreviewMediaDialog={onOpenPreviewMediaDialog}
          onOpenAddMediaMenu={onOpenAddMediaMenu}
          onMoveToFirst={this.handleMoveToFirst}
          onMoveMedia={this.handleMoveMedia}
          onEditMedia={this.handleEditMedia}
          onRemoveFromPlaylist={this.handleRemoveFromPlaylist}
          onLoadPlaylistPage={this.handleLoadPlaylistPage}
          onFilterPlaylistItems={this.handleFilterPlaylistItems}
        />
      );
    } else {
      panel = <PlaylistPanelEmpty className="PlaylistManager-panel" />;
    }

    return (
      <Overlay
        className={cx(
          'PlaylistManager',
          'AppColumn',
          'AppColumn--full',
          this.props.className
        )}
      >
        <PlaylistHeader
          className="PlaylistManager-header AppRow AppRow--top"
          selectedPlaylist={selectedPlaylist}
          searchSource={searchSource}
          onSearchSubmit={onSearchSubmit}
          onSearchSourceChange={onSearchSourceChange}
          onCloseOverlay={onCloseOverlay}
        />

        <div className="AppRow AppRow--middle">
          <PlaylistMenu
            className="PlaylistManager-menu"
            playlists={playlists}
            active={activePlaylist}
            selected={selectedPlaylist}
            showSearchResults={showSearchResults}
            showImportPanel={showImportPanel}
            searchQuery={searchQuery}
            searchResults={searchResults ? searchResults.length : 0}
            onCreatePlaylist={onCreatePlaylist}
            onAddToPlaylist={onAddToPlaylist}
            onSelectPlaylist={this.handleSelectPlaylist}
            onSelectSearchResults={onSelectSearchResults}
            onShowImportPanel={onShowImportPanel}
          />

          {panel}
        </div>
      </Overlay>
    );
  }
}
