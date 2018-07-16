import React from 'react';
import PropTypes from 'prop-types';
import Overlay from '../components/Overlay';
import About from '../components/About';

export default class AboutContainer extends React.Component {
  static contextTypes = {
    uwave: PropTypes.object,
  };

  getAboutPageComponent() {
    const { uwave } = this.context;

    if (this.hasAboutPageComponent()) {
      return uwave.getAboutPageComponent();
    }
    return () => null;
  }

  hasAboutPageComponent() {
    const { uwave } = this.context;

    return Boolean(uwave && uwave.getAboutPageComponent());
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
