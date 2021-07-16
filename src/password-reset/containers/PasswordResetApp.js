import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { TranslateProvider } from '@u-wave/react-translate';
import { resetPassword } from '../actions';
import ErrorArea from '../../containers/ErrorArea';
import PasswordResetPage from '../components/PasswordResetPage';
import PasswordResetSuccessPage from '../components/PasswordResetSuccessPage';
import theme from '../../theme';

const mapStateToProps = createStructuredSelector({
  success: (state) => state.passwordReset.success,
});

const mapDispatchToProps = {
  onSubmit: resetPassword,
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

const muiTheme = createTheme(theme);

const PasswordResetApp = ({
  translator, success, ...props
}) => (
  <ThemeProvider theme={muiTheme}>
    <TranslateProvider translator={translator}>
      <>
        {success ? (
          <PasswordResetSuccessPage />
        ) : (
          <PasswordResetPage {...props} />
        )}
        <ErrorArea />
      </>
    </TranslateProvider>
  </ThemeProvider>
);

PasswordResetApp.propTypes = {
  translator: PropTypes.object.isRequired,
  success: PropTypes.bool,
};

export default enhance(PasswordResetApp);
