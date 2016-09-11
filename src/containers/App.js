import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { closeAll } from '../actions/OverlayActionCreators';
import { createTimer, stopTimer } from '../actions/TickerActionCreators';

import { settingsSelector, muiThemeSelector } from '../selectors/settingSelectors';
import App from '../components/App';

const mapStateToProps = createStructuredSelector({
  activeOverlay: state => state.activeOverlay,
  settings: settingsSelector,
  muiTheme: muiThemeSelector
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createTimer,
    stopTimer,
    onCloseOverlay: closeAll
  }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AppContainer extends Component {
  static propTypes = {
    mediaSources: PropTypes.object.isRequired,
    muiTheme: PropTypes.object,
    createTimer: PropTypes.func.isRequired,
    stopTimer: PropTypes.func.isRequired
  };

  static childContextTypes = {
    timerCallbacks: PropTypes.arrayOf(PropTypes.func),
    mediaSources: PropTypes.object
  };

  getChildContext() {
    return {
      timerCallbacks: this.timerCallbacks,
      mediaSources: this.props.mediaSources
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
