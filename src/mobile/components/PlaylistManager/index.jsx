import React from 'react';
import PropTypes from 'prop-types';
import OverlayHeader from '../../../components/Overlay/Header';
import OverlayContent from '../../../components/Overlay/Content';
import PlaylistPanel from './PlaylistPanel';

const PlaylistManager = ({
  selectedPlaylist,
  selectedItems,
  onCloseOverlay,
}) => (
  <div className="PlaylistManager">
    <OverlayHeader
      className="PlaylistHeader"
      title={selectedPlaylist.name}
      onCloseOverlay={onCloseOverlay}
    />
    <OverlayContent>
      <PlaylistPanel items={selectedItems} />
    </OverlayContent>
  </div>
);

PlaylistManager.propTypes = {
  selectedPlaylist: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  selectedItems: PropTypes.array.isRequired,
  onCloseOverlay: PropTypes.func.isRequired,
};

export default PlaylistManager;
