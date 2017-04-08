import React from 'react';
import PropTypes from 'prop-types';
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
      <About
        {...this.props}
        render={this.getAboutPageComponent()}
      />
    );
  }
}
