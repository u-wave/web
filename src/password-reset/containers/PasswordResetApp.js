import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { MuiThemeProvider } from 'material-ui/styles';
import { I18nextProvider } from 'react-i18next';
import { resetPassword } from '../actions';
import ErrorArea from '../../containers/ErrorArea';
import PasswordResetPage from '../components/PasswordResetPage';
import PasswordResetSuccessPage from '../components/PasswordResetSuccessPage';
import theme from '../../theme';

const mapStateToProps = createStructuredSelector({
  success: state => state.passwordReset.success,
});

const mapDispatchToProps = {
  onSubmit: resetPassword,
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

const PasswordResetApp = ({
  locale, success, ...props
}) => (
  <MuiThemeProvider theme={theme}>
    <I18nextProvider i18n={locale}>
      <div>
        {success ? (
          <PasswordResetSuccessPage />
        ) : (
          <PasswordResetPage {...props} />
        )}
        <ErrorArea />
      </div>
    </I18nextProvider>
  </MuiThemeProvider>
);

PasswordResetApp.propTypes = {
  locale: PropTypes.object.isRequired,
  success: PropTypes.bool,
};

export default enhance(PasswordResetApp);
