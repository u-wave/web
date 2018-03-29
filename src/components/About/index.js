import React from 'react';
import PropTypes from 'prop-types';
import OverlayHeader from '../Overlay/Header';
import OverlayContent from '../Overlay/Content';

const About = ({
  onCloseOverlay,
  render: AboutPanel,
}) => (
  <div className="About">
    <OverlayHeader
      title="About"
      onCloseOverlay={onCloseOverlay}
      direction="top"
    />
    <OverlayContent className="AboutPanel">
      <AboutPanel />
    </OverlayContent>
  </div>
);

About.propTypes = {
  onCloseOverlay: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
};

export default About;
