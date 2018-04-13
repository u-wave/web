import React from 'react';
import PropTypes from 'prop-types';
import Overlay from '../../components/Overlay';
import OverlayHeader from '../../components/Overlay/Header';
import OverlayContent from '../../components/Overlay/Content';

export default class AboutContainer extends React.Component {
  static propTypes = {
    onCloseOverlay: PropTypes.func.isRequired,
  };
  static contextTypes = {
    uwave: PropTypes.object,
  };

  getAboutPageComponent() {
    const uw = this.context.uwave;
    if (uw) {
      return uw.getAboutPageComponent();
    }
    return null;
  }

  render() {
    const About = this.getAboutPageComponent();
    if (!About) return null;
    return (
      <Overlay>
        <OverlayHeader title="About" onCloseOverlay={this.props.onCloseOverlay} />
        <OverlayContent className="AboutPanel">
          <About {...this.props} />
        </OverlayContent>
      </Overlay>
    );
  }
}
