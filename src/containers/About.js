import React from 'react';
import UwaveContext from '../context/UwaveContext';
import Overlay from '../components/Overlay';
import About from '../components/About';

function renderAboutPage(props, uwave) {
  const component = uwave.getAboutPageComponent() ?? null;

  return (
    <About
      {...props}
      hasAboutPage={!!component}
      render={component}
    />
  );
}

const AboutContainer = (props) => (
  <Overlay direction="top">
    <UwaveContext.Consumer>
      {(uwave) => renderAboutPage(props, uwave)}
    </UwaveContext.Consumer>
  </Overlay>
);

export default AboutContainer;
