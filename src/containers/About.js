import React from 'react';
import PropTypes from 'prop-types';
import Overlay from '../components/Overlay';
import About from '../components/About';

export default class AboutContainer extends React.Component {
  static contextTypes = {
    uwave: PropTypes.object
  };

  getAboutPageComponent() {
    const uw = this.context.uwave;
    if (uw) {
      return uw.getAboutPageComponent();
    }
    return () => null;
  }

  render() {
    return (
      <Overlay direction="top">
        <About
          {...this.props}
          render={this.getAboutPageComponent()}
        />
      </Overlay>
    );
  }
}
