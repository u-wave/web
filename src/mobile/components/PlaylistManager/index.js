import React from 'react';
import PropTypes from 'prop-types';
import Overlay from '../../../components/Overlay';
import OverlayHeader from '../../../components/Overlay/Header';
import OverlayContent from '../../../components/Overlay/Content';
import PlaylistPanel from '../../containers/PlaylistPanel';

const PlaylistManager = ({ onCloseOverlay }) => (
  <Overlay>
    <OverlayHeader
      className="PlaylistHeader"
      onCloseOverlay={onCloseOverlay}
    >
      Search comes here
    </OverlayHeader>
    <OverlayContent>
      <PlaylistPanel />
    </OverlayContent>
  </Overlay>
);

PlaylistManager.propTypes = {
  onCloseOverlay: PropTypes.func.isRequired
};

export default PlaylistManager;
