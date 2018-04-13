import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Overlay from '../../components/Overlay';
import OverlayContent from '../../components/Overlay/Content';
import OverlayHeader from '../../components/Overlay/Header';
import ServerList from '../../components/ServerList';

const enhance = translate();

const ServerListContainer = ({ t, onCloseOverlay }) => (
  <Overlay>
    <OverlayHeader title={t('about.servers')} onCloseOverlay={onCloseOverlay} />
    <OverlayContent className="AboutPanel">
      <ServerList />
    </OverlayContent>
  </Overlay>
);

ServerListContainer.propTypes = {
  t: PropTypes.func.isRequired,
  onCloseOverlay: PropTypes.func.isRequired,
};

export default enhance(ServerListContainer);
