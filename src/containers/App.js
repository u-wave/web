import * as React from 'react';
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
    mediaSources: React.PropTypes.object.isRequired,
    uwave: React.PropTypes.object,
    language: React.PropTypes.string,
    muiTheme: React.PropTypes.object,
    createTimer: React.PropTypes.func.isRequired,
    stopTimer: React.PropTypes.func.isRequired
  };

  static childContextTypes = {
    timerCallbacks: React.PropTypes.arrayOf(React.PropTypes.func),
    mediaSources: React.PropTypes.object,
    uwave: React.PropTypes.object
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
