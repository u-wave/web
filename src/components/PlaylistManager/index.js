import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import OverlayContent from '../Overlay/Content';
import PlaylistMenu from '../../containers/PlaylistManagerMenu';
import PlaylistPanel from '../../containers/PlaylistManagerPanel';
import PlaylistImport from '../../containers/PlaylistImportManager';
import SearchResults from '../../containers/SearchResultsPanel';
import PlaylistHeader from './Header';
import NoPlaylists from './NoPlaylists';

const PlaylistManager = ({
  className,
  selectedPlaylist,
  showSearchResults,
  showImportPanel,
  onCloseOverlay,
}) => {
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
    panel = <NoPlaylists />;
  }

  return (
    <div className={cx('PlaylistManager', className)}>
      <PlaylistHeader
        className="PlaylistManager-header AppRow AppRow--top"
        onCloseOverlay={onCloseOverlay}
      />

      <OverlayContent>
        <PlaylistMenu className="PlaylistManager-menu" />
        <div className="PlaylistManager-panel">
          {panel}
        </div>
      </OverlayContent>
    </div>
  );
};

PlaylistManager.propTypes = {
  className: PropTypes.string,
  selectedPlaylist: PropTypes.object,
  showSearchResults: PropTypes.bool.isRequired,
  showImportPanel: PropTypes.bool.isRequired,
  onCloseOverlay: PropTypes.func,
};

export default PlaylistManager;
