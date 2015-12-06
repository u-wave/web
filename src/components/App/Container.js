import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { login, register } from '../../actions/LoginActionCreators';
import { selectPanel } from '../../actions/PanelSelectActionCreators';

import App from './';

function mapStateToProps(state) {
  return {
    activeOverlay: state.activeOverlay,
    selectedPanel: state.selectedPanel,
    settings: state.settings,
    user: state.auth.user
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectPanel,
    onLogin: login,
    onRegister: register
  }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AppContainer extends Component {
  static propTypes = {
    activeOverlay: PropTypes.string,
    selectedPanel: PropTypes.string,
    settings: PropTypes.object,
    user: PropTypes.object,

    onLogin: PropTypes.func,
    onRegister: PropTypes.func,
    selectPanel: PropTypes.func
  };

  render() {
    return <App {...this.props} />;
  }
}
