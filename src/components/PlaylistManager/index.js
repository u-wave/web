import cx from 'classnames';
import * as React from 'react';

import Overlay from '../Overlay';

import PlaylistMenu from '../../containers/PlaylistManagerMenu';
import PlaylistPanel from '../../containers/PlaylistManagerPanel';
import PlaylistImport from '../../containers/PlaylistImportManager';
import SearchResults from '../../containers/SearchResultsPanel';
import PlaylistHeader from './Header';
import PlaylistPanelEmpty from './Panel/Empty';

// eslint-disable-next-line react/prefer-stateless-function
export default class PlaylistManager extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    selectedPlaylist: React.PropTypes.object,
    showSearchResults: React.PropTypes.bool.isRequired,
    showImportPanel: React.PropTypes.bool.isRequired,
    onCloseOverlay: React.PropTypes.func
  };

  render() {
    const {
      selectedPlaylist,

      showSearchResults,
      showImportPanel,

      onCloseOverlay
    } = this.props;

    let panel;
    if (showImportPanel) {
      panel = (
        <div className="PlaylistPanel">
          <PlaylistImport />
        </div>
      );
    } else if (showSearchResults) {
      panel = <SearchResults />;
    } else if (selectedPlaylist) {
      // HACK Give this a key so it's remounted when you switch playlists.
      // This is because there is some statefulness down the tree, especially
      // in playlist filters and scroll position.
      // By forcing a remount using a key we throw away all state and keep it
      // consistent.
      // TODO To *actually* fix playlist filters bleeding across playlist lines,
      // we should reset the playlist filter state alone somehow when the
      // selected playlist changes.
      panel = <PlaylistPanel key={selectedPlaylist._id} />;
    } else {
      panel = <PlaylistPanelEmpty />;
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
          onCloseOverlay={onCloseOverlay}
        />

        <div className="AppRow AppRow--middle">
          <PlaylistMenu className="PlaylistManager-menu" />

          <div className="PlaylistManager-panel">
            {panel}
          </div>
        </div>
      </Overlay>
    );
  }
}
