import React from 'react';
import UwaveContext from '../context/UwaveContext';
import Overlay from '../components/Overlay';
import About from '../components/About';

const {
  useContext,
} = React;

function AboutContainer(props) {
  const uwave = useContext(UwaveContext);
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
