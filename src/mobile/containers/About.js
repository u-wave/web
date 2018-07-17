import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Overlay from '../../components/Overlay';
import OverlayHeader from '../../components/Overlay/Header';
import OverlayContent from '../../components/Overlay/Content';

const enhance = translate();

class AboutContainer extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onCloseOverlay: PropTypes.func.isRequired,
  };

  static contextTypes = {
    uwave: PropTypes.object,
  };

  getAboutPageComponent() {
    const { uwave } = this.context;
    if (uwave) {
      return uwave.getAboutPageComponent();
    }
    return null;
  }

  render() {
    const About = this.getAboutPageComponent();
    if (!About) return null;

    const { t, onCloseOverlay, ...props } = this.props;

    return (
      <Overlay>
        <OverlayHeader title={t('about.about')} onCloseOverlay={onCloseOverlay} />
        <OverlayContent className="AboutPanel">
          <About {...props} />
        </OverlayContent>
      </Overlay>
    );
  }
}

export default enhance(AboutContainer);
