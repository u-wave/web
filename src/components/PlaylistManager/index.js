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
    activeMedia: PropTypes.array,
    selectedPlaylist: PropTypes.object,
    selectedMedia: PropTypes.array,

    showImportPanel: PropTypes.bool.isRequired,

    searchSource: PropTypes.oneOf([ 'youtube', 'soundcloud' ]),
    searchQuery: PropTypes.string,
    searchResults: PropTypes.object,
    searchLoadingState: PropTypes.oneOf([ IDLE, LOADING, LOADED ]),

    onCloseOverlay: PropTypes.func,
    onCreatePlaylist: PropTypes.func,
    onRenamePlaylist: PropTypes.func,
    onDeletePlaylist: PropTypes.func,
    onActivatePlaylist: PropTypes.func,
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
    onLoadPlaylistPage: PropTypes.func
  };

  withSelected(fn) {
    const selectedPlaylist = this.props.selectedPlaylist;
    if (selectedPlaylist) {
      fn(selectedPlaylist);
    }
  }

  handleMoveToFirst = (media, selection) => {
    this.withSelected(selectedPlaylist =>
      this.props.onMoveToFirst(selectedPlaylist._id, media, selection)
    );
  };

  handleEditMedia = media => {
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

  handleLoadPlaylistPage = page => {
    this.withSelected(selectedPlaylist =>
      this.props.onLoadPlaylistPage(selectedPlaylist._id, page)
    );
  };

  handleSelectPlaylist = playlist => {
    this.props.onSelectPlaylist(playlist._id);
  };

  render() {
    const {
      playlists,
      activePlaylist,
      selectedPlaylist,
      selectedMedia,

      showImportPanel,

      searchSource,
      searchQuery,
      searchResults,
      searchLoadingState,

      onCloseOverlay,
      onCreatePlaylist,
      onDeletePlaylist,
      onAddToPlaylist,
      onActivatePlaylist,
      onRenamePlaylist,
      onSelectSearchResults,
      onSearchSubmit,
      onSearchSourceChange,
      onShowImportPanel
    } = this.props;

    let panel;
    if (showImportPanel) {
      panel = (
        <div className="PlaylistPanel PlaylistManager-panel">
          <PlaylistImport />
        </div>
      );
    } else if (selectedPlaylist) {
      panel = (
        <PlaylistPanel
          className="PlaylistManager-panel"
          playlist={selectedPlaylist}
          media={selectedMedia}
          loading={!!selectedPlaylist.loading}
          onActivatePlaylist={onActivatePlaylist}
          onRenamePlaylist={onRenamePlaylist}
          onDeletePlaylist={onDeletePlaylist}
          onOpenAddMediaMenu={this.props.onOpenAddMediaMenu}
          onMoveToFirst={this.handleMoveToFirst}
          onMoveMedia={this.handleMoveMedia}
          onEditMedia={this.handleEditMedia}
          onRemoveFromPlaylist={this.handleRemoveFromPlaylist}
          onLoadPlaylistPage={this.handleLoadPlaylistPage}
        />
      );
    } else if (searchQuery) {
      const { onOpenAddMediaMenu } = this.props;
      panel = (
        <SearchResults
          className="PlaylistManager-panel"
          query={searchQuery}
          results={searchResults}
          loadingState={searchLoadingState}
          onOpenAddMediaMenu={onOpenAddMediaMenu}
        />
      );
    } else {
      panel = <PlaylistPanelEmpty />;
    }

    return (
      <Overlay className={cx('PlaylistManager', 'AppColumn', 'AppColumn--full', this.props.className)}>
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
