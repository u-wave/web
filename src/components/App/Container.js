import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectPanel } from '../../actions/PanelSelectActionCreators';

import App from './';

function mapStateToProps(state) {
  return {
    activeOverlay: state.activeOverlay,
    selectedPanel: state.selectedPanel
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectPanel
  }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AppContainer extends Component {
  static propTypes = {
    activeOverlay: PropTypes.string,
    selectedPanel: PropTypes.string,

    selectPanel: PropTypes.func
  };

  render() {
    return <App {...this.props} />;
  }
}
