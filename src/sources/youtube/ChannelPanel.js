import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import useDirection from '../../hooks/useDirection';
import ImportPanelHeader from '../../components/PlaylistManager/Import/ImportPanelHeader';
import PlaylistRow from './PlaylistRow';

function ChannelPanel({
  importingChannelTitle,
  importablePlaylists,
  onImportPlaylist,
  onClosePanel,
}) {
  const direction = useDirection();

  const body = (
    <AutoSizer disableWidth>
      {({ height }) => (
        <FixedSizeList
          height={height}
          itemCount={importablePlaylists.length}
          itemSize={56}
          direction={direction}
        >
          {({ index, style }) => {
            const playlist = importablePlaylists[index];
            return (
              <PlaylistRow
                key={playlist.sourceID}
                className={index % 2 === 0 ? 'MediaListRow--alternate' : ''}
                style={style}
                playlist={playlist}
                onImport={() => onImportPlaylist(playlist.sourceID, playlist.name)}
              />
            );
          }}
        </FixedSizeList>
      )}
    </AutoSizer>
  );

  return (
    <div className="ImportPanel ChannelPanel">
      <ImportPanelHeader onClosePanel={onClosePanel}>
        {`${importingChannelTitle}'s Playlists`}
      </ImportPanelHeader>
      <div className="MediaList ImportPanel-body">
        {body}
      </div>
    </div>
  );
}

ChannelPanel.propTypes = {
  importingChannelTitle: PropTypes.string.isRequired,
  importablePlaylists: PropTypes.arrayOf(PropTypes.object).isRequired,
  onImportPlaylist: PropTypes.func.isRequired,
  onClosePanel: PropTypes.func.isRequired,
};

export default ChannelPanel;
