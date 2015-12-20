import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ThemeManager from 'material-ui/lib/styles/theme-manager';

import { closeAll } from '../../actions/OverlayActionCreators';
import { login, register } from '../../actions/LoginActionCreators';
import { selectPanel } from '../../actions/PanelSelectActionCreators';
import { sendChat } from '../../actions/ChatActionCreators';

import MuiTheme from '../../MuiTheme';
import App from './';

const mapStateToProps = ({
  activeOverlay, selectedPanel, settings, auth, waitlist
}) => ({
  activeOverlay,
  selectedPanel,
  settings,
  user: auth.user,
  waitlistPosition: auth.user ? waitlist.waitlist.indexOf(auth.user._id) : -1,
  waitlistSize: waitlist.waitlist.length
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectPanel,
    sendChatMessage: sendChat,
    onCloseOverlay: closeAll,
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
    onCloseOverlay: PropTypes.func,
    selectPanel: PropTypes.func,
    sendChatMessage: PropTypes.func
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MuiTheme)
    };
  }

  render() {
    return <App {...this.props} />;
  }
}
