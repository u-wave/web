import React from 'react';
import PropTypes from 'prop-types';
import { useVirtual } from 'react-virtual';
import ImportPanelHeader from '../../components/PlaylistManager/Import/ImportPanelHeader';
import PlaylistRow from './PlaylistRow';

const {
  useRef,
} = React;

function estimateSize() {
  return 56;
}

function ChannelPanel({
  importingChannelTitle,
  importablePlaylists,
  onImportPlaylist,
  onClosePanel,
}) {
  const parentRef = useRef();

  const { virtualItems, totalSize } = useVirtual({
    size: importablePlaylists.length,
    parentRef,
    estimateSize,
    overscan: 6,
  });

  return (
    <div className="ImportPanel ChannelPanel">
      <ImportPanelHeader onClosePanel={onClosePanel}>
        {`${importingChannelTitle}'s Playlists`}
      </ImportPanelHeader>
      <div className="MediaList ImportPanel-body">
        <div style={{ height: `${totalSize}px`, width: '100%', position: 'relative' }}>
          {virtualItems.map(({ index, start, size }) => {
            const playlist = importablePlaylists[index];
            const style = {
              position: 'absolute',
              top: 0,
              height: size,
              transform: `translateY(${start}px)`,
            };
            return (
              <PlaylistRow
                key={playlist.sourceID}
                className={index % 2 === 0 ? 'MediaListRow--alternate' : ''}
                style={style}
                playlist={playlist}
                onImport={() => onImportPlaylist(playlist.sourceID, playlist.name)}
              />
            );
          })}
        </div>
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
