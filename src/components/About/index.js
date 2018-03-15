import React from 'react';
import PropTypes from 'prop-types';
import OverlayHeader from '../Overlay/Header';

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
    <div className="AppRow AppRow--middle AboutPanel">
      <AboutPanel />
    </div>
  </div>
);

About.propTypes = {
  onCloseOverlay: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
};

export default About;
