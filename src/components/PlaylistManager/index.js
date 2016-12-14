import cx from 'classnames';
import * as React from 'react';

import { IDLE, LOADING, LOADED } from '../../constants/LoadingStates';
import Overlay from '../Overlay';

import PlaylistMenu from '../../containers/PlaylistManagerMenu';
import PlaylistHeader from './Header';
import PlaylistPanel from '../../containers/PlaylistManagerPanel';
import PlaylistPanelEmpty from './Panel/Empty';
import PlaylistImport from '../../containers/PlaylistImportManager';
import SearchResults from './Panel/SearchResults';

// eslint-disable-next-line react/prefer-stateless-function
export default class PlaylistManager extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,

    selectedPlaylist: React.PropTypes.object,

    showSearchResults: React.PropTypes.bool.isRequired,
    showImportPanel: React.PropTypes.bool.isRequired,

    searchSource: React.PropTypes.string,
    searchQuery: React.PropTypes.string,
    searchResults: React.PropTypes.array,
    searchLoadingState: React.PropTypes.oneOf([ IDLE, LOADING, LOADED ]),

    onCloseOverlay: React.PropTypes.func,
    onSearchSubmit: React.PropTypes.func,
    onSearchSourceChange: React.PropTypes.func,
    onOpenAddMediaMenu: React.PropTypes.func,
    onOpenPreviewMediaDialog: React.PropTypes.func
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
