import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import UwaveContext from '../../context/UwaveContext';
import Overlay from '../../components/Overlay';
import OverlayHeader from '../../components/Overlay/Header';
import OverlayContent from '../../components/Overlay/Content';

const { useContext } = React;

function AboutOverlay({
  onCloseOverlay,
  ...props
}) {
  const { t } = useTranslator();
  const AboutPage = useContext(UwaveContext).getAboutPageComponent();

  if (!AboutPage) {
    return null;
  }

  return (
    <Overlay>
      <OverlayHeader title={t('about.about')} onCloseOverlay={onCloseOverlay} />
      <OverlayContent className="AboutPanel">
        <AboutPage {...props} />
      </OverlayContent>
    </Overlay>
  );
}

AboutOverlay.propTypes = {
  onCloseOverlay: PropTypes.func.isRequired,
};

export default AboutOverlay;
