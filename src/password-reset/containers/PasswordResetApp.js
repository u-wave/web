import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { TranslateProvider } from '@u-wave/react-translate';
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

const muiTheme = createMuiTheme(theme);

const PasswordResetApp = ({
  translator, success, ...props
}) => (
  <MuiThemeProvider theme={muiTheme}>
    <TranslateProvider translator={translator}>
      <React.Fragment>
        {success ? (
          <PasswordResetSuccessPage />
        ) : (
          <PasswordResetPage {...props} />
        )}
        <ErrorArea />
      </React.Fragment>
    </TranslateProvider>
  </MuiThemeProvider>
);

PasswordResetApp.propTypes = {
  translator: PropTypes.object.isRequired,
  success: PropTypes.bool,
};

export default enhance(PasswordResetApp);
