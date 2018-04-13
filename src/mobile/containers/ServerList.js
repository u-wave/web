import React from 'react';
import PropTypes from 'prop-types';
import Overlay from '../../components/Overlay';
import OverlayContent from '../../components/Overlay/Content';
import OverlayHeader from '../../components/Overlay/Header';
import ServerList from '../../components/ServerList';

const ServerListContainer = ({ onCloseOverlay }) => (
  <Overlay>
    <OverlayHeader title="Servers" onCloseOverlay={onCloseOverlay} />
    <OverlayContent className="AboutPanel">
      <ServerList />
    </OverlayContent>
  </Overlay>
);

ServerListContainer.propTypes = {
  onCloseOverlay: PropTypes.func.isRequired,
};

export default ServerListContainer;
