import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { I18nextProvider } from 'react-i18next';
import { resetPassword } from '../actions';
import PasswordResetPage from '../components/PasswordResetPage';
import { muiThemeSelector } from '../../selectors/settingSelectors';

const mapStateToProps = createStructuredSelector({
  muiTheme: muiThemeSelector
});

const mapDispatchToProps = {
  onSubmit: resetPassword
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

const PasswordResetApp = ({ muiTheme, locale, ...props }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <I18nextProvider i18n={locale}>
      <PasswordResetPage {...props} />
    </I18nextProvider>
  </MuiThemeProvider>
);

PasswordResetApp.propTypes = {
  muiTheme: React.PropTypes.object.isRequired,
  locale: React.PropTypes.object.isRequired
};

export default enhance(PasswordResetApp);
