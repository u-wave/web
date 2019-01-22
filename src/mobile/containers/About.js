import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import UwaveContext from '../../context/UwaveContext';
import Overlay from '../../components/Overlay';
import OverlayHeader from '../../components/Overlay/Header';
import OverlayContent from '../../components/Overlay/Content';

const enhance = translate();

const AboutOverlay = ({
  t,
  onCloseOverlay,
  AboutPage,
  ...props
}) => {
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
};

AboutOverlay.propTypes = {
  t: PropTypes.func.isRequired,
  onCloseOverlay: PropTypes.func.isRequired,
  AboutPage: PropTypes.func,
};

const TranslatedAboutOverlay = enhance(AboutOverlay);

const AboutContainer = props => (
  <UwaveContext.Consumer>
    {uwave => (
      <TranslatedAboutOverlay
        {...props}
        AboutPage={uwave.getAboutPageComponent()}
      />
    )}
  </UwaveContext.Consumer>
);

export default AboutContainer;
