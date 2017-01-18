import * as React from 'react';

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
  onCloseOverlay: React.PropTypes.func.isRequired
};

export default PlaylistManager;
