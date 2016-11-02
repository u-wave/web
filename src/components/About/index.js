import * as React from 'react';
import Overlay from '../Overlay';
import OverlayHeader from '../Overlay/Header';

const About = ({
  onCloseOverlay,
  render: AboutPanel
}) => (
  <Overlay className="AppColumn AppColumn--full" direction="top">
    <OverlayHeader
      title="About"
      onCloseOverlay={onCloseOverlay}
      direction="top"
    />
    <div className="AppRow AppRow--middle AboutPanel">
      <AboutPanel />
    </div>
  </Overlay>
);

About.propTypes = {
  onCloseOverlay: React.PropTypes.func.isRequired,
  render: React.PropTypes.func.isRequired
};

export default About;
