import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { inputMessage } from '../actions/ChatActionCreators';
import { closeAll } from '../actions/OverlayActionCreators';
import { createTimer, stopTimer } from '../actions/TickerActionCreators';

import { currentUserSelector } from '../selectors/userSelectors';
import { settingsSelector, muiThemeSelector } from '../selectors/settingSelectors';
import App from '../components/App';

const mapStateToProps = createStructuredSelector({
  activeOverlay: state => state.activeOverlay,
  settings: settingsSelector,
  user: currentUserSelector,
  muiTheme: muiThemeSelector
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createTimer,
    stopTimer,
    sendChatMessage: inputMessage,
    onCloseOverlay: closeAll
  }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AppContainer extends Component {
  static propTypes = {
    muiTheme: PropTypes.object,
    createTimer: PropTypes.func.isRequired,
    stopTimer: PropTypes.func.isRequired
  };

  static childContextTypes = {
    timerCallbacks: PropTypes.arrayOf(PropTypes.func)
  };

  getChildContext() {
    return {
      timerCallbacks: this.timerCallbacks
    };
  }

  componentWillMount() {
    // Start the clock! üWave stores the current time in the application state
    // primarily to make sure that different timers in the UI update simultaneously.
    this.timerCallbacks = this.props.createTimer();
  }

  componentWillUnmount() {
    this.timerCallbacks = [];
    this.props.stopTimer();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <App {...this.props} />
      </MuiThemeProvider>
    );
  }
}
