import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ImportIcon from '@material-ui/icons/PlaylistAdd';
import MediaList from '../../components/MediaList';
import ImportPanelHeader from '../../components/PlaylistManager/Import/ImportPanelHeader';

function YouTubeImportPlaylistPanel({
  importingPlaylist,
  importingPlaylistItems,
  onImportPlaylist,
  onClosePanel,
}) {
  const handleImportFull = () => onImportPlaylist(
    importingPlaylist.sourceID, importingPlaylist.name,
  );

  return (
    <div className="ImportPanel src-youtube-PlaylistPanel">
      <ImportPanelHeader onClosePanel={onClosePanel}>
        <div className="src-youtube-PlaylistPanel-header">
          <div className="src-youtube-PlaylistPanel-name">
            {importingPlaylist.name}
          </div>
          <Tooltip title={`Import All (${importingPlaylistItems.length})`} placement="top">
            <IconButton onClick={handleImportFull}>
              <ImportIcon className="src-youtube-PlaylistPanel-importIcon" />
            </IconButton>
          </Tooltip>
        </div>
      </ImportPanelHeader>
      <MediaList
        className="ImportPanel-body"
        media={importingPlaylistItems}
      />
    </div>
  );
}

YouTubeImportPlaylistPanel.propTypes = {
  importingPlaylist: PropTypes.shape({
    sourceID: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  importingPlaylistItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  onImportPlaylist: PropTypes.func.isRequired,
  onClosePanel: PropTypes.func.isRequired,
};

export default YouTubeImportPlaylistPanel;
