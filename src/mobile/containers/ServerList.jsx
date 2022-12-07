import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Overlay from '../../components/Overlay';
import OverlayContent from '../../components/Overlay/Content';
import OverlayHeader from '../../components/Overlay/Header';
import ServerList from '../../components/ServerList';

function ServerListContainer({ onCloseOverlay }) {
  const { t } = useTranslator();

  return (
    <Overlay>
      <OverlayHeader title={t('about.servers')} onCloseOverlay={onCloseOverlay} />
      <OverlayContent className="AboutPanel">
        <ServerList />
      </OverlayContent>
    </Overlay>
  );
}

ServerListContainer.propTypes = {
  onCloseOverlay: PropTypes.func.isRequired,
};

export default ServerListContainer;
