import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { I18nextProvider } from 'react-i18next';

import createLocale from '../locale';

import { closeAll } from '../actions/OverlayActionCreators';
import { createTimer, stopTimer } from '../actions/TickerActionCreators';

import {
  settingsSelector,
  languageSelector,
  muiThemeSelector
} from '../selectors/settingSelectors';
import App from '../components/App';

const mapStateToProps = createStructuredSelector({
  activeOverlay: state => state.activeOverlay,
  settings: settingsSelector,
  language: languageSelector,
  muiTheme: muiThemeSelector,
  hasAboutPage: (state, props) => (
    props.uwave.getAboutPageComponent() !== null
  )
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createTimer,
  stopTimer,
  onCloseOverlay: closeAll
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class AppContainer extends React.Component {
  static propTypes = {
    mediaSources: PropTypes.object.isRequired,
    uwave: PropTypes.object,
    language: PropTypes.string,
    muiTheme: PropTypes.object,
    createTimer: PropTypes.func.isRequired,
    stopTimer: PropTypes.func.isRequired
  };

  static childContextTypes = {
    timerCallbacks: PropTypes.arrayOf(PropTypes.func),
    mediaSources: PropTypes.object,
    uwave: PropTypes.object
  };

  getChildContext() {
    return {
      timerCallbacks: this.timerCallbacks,
      mediaSources: this.props.mediaSources,
      uwave: this.props.uwave
    };
  }

  // TODO move this to constructor?
  componentWillMount() {
    // Start the clock! üWave stores the current time in the application state
    // primarily to make sure that different timers in the UI update simultaneously.
    this.timerCallbacks = this.props.createTimer();
    this.locale = createLocale(this.props.language);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.language !== nextProps.language) {
      this.locale.changeLanguage(nextProps.language);
    }
  }

  componentWillUnmount() {
    this.timerCallbacks = [];
    this.props.stopTimer();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <I18nextProvider i18n={this.locale}>
          <App {...this.props} />
        </I18nextProvider>
      </MuiThemeProvider>
    );
  }
}
