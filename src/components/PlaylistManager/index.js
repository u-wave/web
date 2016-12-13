import cx from 'classnames';
import React, { Component, PropTypes } from 'react';

import { IDLE, LOADING, LOADED } from '../../constants/LoadingStates';
import Overlay from '../Overlay';

import PlaylistMenu from '../../containers/PlaylistManagerMenu';
import PlaylistHeader from './Header';
import PlaylistPanel from '../../containers/PlaylistManagerPanel';
import PlaylistPanelEmpty from './Panel/Empty';
import PlaylistImport from '../../containers/PlaylistImportManager';
import SearchResults from './Panel/SearchResults';

// eslint-disable-next-line react/prefer-stateless-function
export default class PlaylistManager extends Component {
  static propTypes = {
    className: PropTypes.string,

    selectedPlaylist: PropTypes.object,

    showSearchResults: PropTypes.bool.isRequired,
    showImportPanel: PropTypes.bool.isRequired,

    searchSource: PropTypes.string,
    searchQuery: PropTypes.string,
    searchResults: PropTypes.array,
    searchLoadingState: PropTypes.oneOf([ IDLE, LOADING, LOADED ]),

    onCloseOverlay: PropTypes.func,
    onSearchSubmit: PropTypes.func,
    onSearchSourceChange: PropTypes.func,
    onOpenAddMediaMenu: PropTypes.func,
    onOpenPreviewMediaDialog: PropTypes.func
  };

  render() {
    const {
      selectedPlaylist,

      showSearchResults,
      showImportPanel,

      searchSource,
      searchQuery,
      searchResults,
      searchLoadingState,

      onCloseOverlay,
      onSearchSubmit,
      onSearchSourceChange,

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
        <div className="PlaylistManager-panel">
          <PlaylistPanel />
        </div>
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
          <PlaylistMenu className="PlaylistManager-menu" />

          {panel}
        </div>
      </Overlay>
    );
  }
}
