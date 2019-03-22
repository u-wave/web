import React from 'react';
import PropTypes from 'prop-types';
import nest from 'recompose/nest';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ThemeProvider } from '@material-ui/styles';
import { Provider as BusProvider } from 'react-bus';
import { TranslateProvider } from '@u-wave/react-translate';
import { Mobile, Desktop } from '../components/Responsive';
import { closeAll } from '../actions/OverlayActionCreators';
import {
  settingsSelector,
  themeSelector,
} from '../selectors/settingSelectors';
import { translatorSelector } from '../selectors/localeSelectors';
import { isConnectedSelector } from '../selectors/serverSelectors';
import DesktopApp from '../components/App';
import MobileApp from '../mobile/components/App';
import FatalError from '../components/FatalError';
import UwaveContext from '../context/UwaveContext';
import ClockContext from '../context/ClockContext';
import MediaSourceContext from '../context/MediaSourceContext';

const SimpleProviders = nest(
  BusProvider,
  ClockContext.Provider,
);

const mapStateToProps = createStructuredSelector({
  activeOverlay: state => state.activeOverlay,
  isConnected: isConnectedSelector,
  settings: settingsSelector,
  theme: themeSelector,
  translator: translatorSelector,
});

const mapDispatchToProps = {
  onCloseOverlay: closeAll,
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

class AppContainer extends React.Component {
  static propTypes = {
    mediaSources: PropTypes.object.isRequired,
    uwave: PropTypes.object,
    theme: PropTypes.object,
    translator: PropTypes.object.isRequired,
  };

  state = {
    error: null,
  };

  componentDidMount() {
    this.applyThemeProperties();
  }

  componentDidUpdate(prevProps) {
    const { theme } = this.props;

    if (theme !== prevProps.theme) {
      this.applyThemeProperties();
    }
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  applyThemeProperties() {
    const { theme } = this.props;
    const root = document.body;

    Object.keys(theme.cssProperties).forEach((prop) => {
      root.style.setProperty(prop, theme.cssProperties[prop]);
    });
  }

  renderApp = () => (
    <React.Fragment>
      <Mobile>
        <MobileApp {...this.props} />
      </Mobile>
      <Desktop>
        <DesktopApp {...this.props} />
      </Desktop>
    </React.Fragment>
  );

  render() {
    const {
      uwave,
      mediaSources,
      theme,
      translator,
    } = this.props;
    const { error } = this.state;

    if (error) {
      // Let's hope the ThemeProvider works at least...
      return (
        <ThemeProvider theme={theme}>
          <FatalError error={error} />
        </ThemeProvider>
      );
    }

    return (
      <ThemeProvider theme={theme}>
        <TranslateProvider translator={translator}>
          <SimpleProviders>
            <UwaveContext.Provider value={uwave}>
              <MediaSourceContext.Provider mediaSources={mediaSources}>
                {this.renderApp()}
              </MediaSourceContext.Provider>
            </UwaveContext.Provider>
          </SimpleProviders>
        </TranslateProvider>
      </ThemeProvider>
    );
  }
}

export default enhance(AppContainer);
