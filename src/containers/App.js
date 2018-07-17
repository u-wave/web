import React from 'react';
import PropTypes from 'prop-types';
import nest from 'recompose/nest';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { I18nextProvider } from 'react-i18next';
import { Provider as BusProvider } from 'react-bus';
import { Mobile, Desktop } from '../components/Responsive';
import ClockProvider from '../components/ClockProvider';
import { closeAll } from '../actions/OverlayActionCreators';
import {
  settingsSelector,
  languageSelector,
  themeSelector,
} from '../selectors/settingSelectors';
import { isConnectedSelector } from '../selectors/serverSelectors';
import DesktopApp from '../components/App';
import MobileApp from '../mobile/components/App';
import FatalError from '../components/FatalError';

const SimpleProviders = nest(BusProvider, ClockProvider);

const mapStateToProps = createStructuredSelector({
  activeOverlay: state => state.activeOverlay,
  isConnected: isConnectedSelector,
  settings: settingsSelector,
  language: languageSelector,
  theme: themeSelector,
});

const mapDispatchToProps = {
  onCloseOverlay: closeAll,
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

class AppContainer extends React.Component {
  static propTypes = {
    mediaSources: PropTypes.object.isRequired,
    uwave: PropTypes.object,
    language: PropTypes.string,
    theme: PropTypes.object,
    locale: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    mediaSources: PropTypes.object,
    uwave: PropTypes.object,
  };

  state = {
    error: null,
  };

  getChildContext() {
    const { uwave, mediaSources } = this.props;

    return { uwave, mediaSources };
  }

  componentDidMount() {
    this.applyThemeProperties();
  }

  componentDidUpdate(prevProps) {
    const { locale, language, theme } = this.props;

    if (language !== prevProps.language) {
      locale.changeLanguage(language);
    }

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
    const { theme, locale } = this.props;
    const { error } = this.state;

    if (error) {
      // Let's hope the ThemeProvider works at least...
      return (
        <MuiThemeProvider theme={theme}>
          <FatalError error={error} />
        </MuiThemeProvider>
      );
    }

    return (
      <MuiThemeProvider theme={theme}>
        <I18nextProvider i18n={locale}>
          <SimpleProviders>
            {this.renderApp()}
          </SimpleProviders>
        </I18nextProvider>
      </MuiThemeProvider>
    );
  }
}

export default enhance(AppContainer);
