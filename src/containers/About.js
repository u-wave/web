import React from 'react';
import PropTypes from 'prop-types';
import Overlay from '../components/Overlay';
import About from '../components/About';

export default class AboutContainer extends React.Component {
  static contextTypes = {
    uwave: PropTypes.object,
  };

  getAboutPageComponent() {
    if (this.hasAboutPageComponent()) {
      const uw = this.context.uwave;
      return uw.getAboutPageComponent();
    }
    return () => null;
  }

  hasAboutPageComponent() {
    const uw = this.context.uwave;
    return Boolean(uw && uw.getAboutPageComponent());
  }

  render() {
    return (
      <Overlay direction="top">
        <About
          {...this.props}
          hasAboutPage={this.hasAboutPageComponent()}
          render={this.getAboutPageComponent()}
        />
      </Overlay>
    );
  }
}
