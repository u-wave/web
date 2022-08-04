import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useVirtualizer } from '@tanstack/react-virtual';
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

  const virtualizer = useVirtualizer({
    count: importablePlaylists.length,
    getScrollElement: () => parentRef.current,
    estimateSize,
    overscan: 6,
  });

  return (
    <div className="ImportPanel ChannelPanel">
      <ImportPanelHeader onClosePanel={onClosePanel}>
        {`${importingChannelTitle}'s Playlists`}
      </ImportPanelHeader>
      <div className="MediaList ImportPanel-body">
        <div style={{ height: `${virtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
          {virtualizer.getVirtualItems().map(({ index, start }) => {
            const playlist = importablePlaylists[index];
            const style = { transform: `translateY(${start}px)` };
            return (
              <PlaylistRow
                key={playlist.sourceID}
                className={cx('MediaList-row', index % 2 === 0 ? 'MediaListRow--alternate' : null)}
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
