import React from 'react';
import PropTypes from 'prop-types';
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
  onCloseOverlay: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired
};

export default About;
