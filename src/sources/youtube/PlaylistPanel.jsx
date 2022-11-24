import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { mdiPlaylistPlus } from '@mdi/js';
import SvgIcon from '../../components/SvgIcon';
import MediaListBase from '../../components/MediaList/BaseMediaList';
import ImportPanelHeader from '../../components/PlaylistManager/Import/ImportPanelHeader';
import ImportRow from './ImportRow';

function YouTubeImportPlaylistPanel({
  importingPlaylist,
  importingPlaylistItems,
  onImportPlaylist,
  onClosePanel,
}) {
  const handleImportFull = () => (
    onImportPlaylist(importingPlaylist.sourceID, importingPlaylist.name)
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
              <SvgIcon path={mdiPlaylistPlus} className="src-youtube-PlaylistPanel-importIcon" />
            </IconButton>
          </Tooltip>
        </div>
      </ImportPanelHeader>
      <MediaListBase
        className="ImportPanel-body"
        media={importingPlaylistItems}
        listComponent="div"
        rowComponent={ImportRow}
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
