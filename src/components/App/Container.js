import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import App from './';

function mapStateToProps(state) {
  return {
    activeOverlay: state.activeOverlay
  };
}
function mapDispatchToProps() {
  return {};
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AppContainer extends Component {
  static propTypes = {
    activeOverlay: PropTypes.string
  };

  render() {
    return <App {...this.props} />;
  }
}
