import React from 'react';
import { useUwave } from '../context/UwaveContext';
import Overlay from '../components/Overlay';
import About from '../components/About';

function AboutContainer(props) {
  const uwave = useUwave();
  const component = uwave.getAboutPageComponent() ?? null;

  return (
    <Overlay direction="top">
      <About
        {...props}
        hasAboutPage={!!component}
        render={component}
      />
    </Overlay>
  );
}

export default AboutContainer;
