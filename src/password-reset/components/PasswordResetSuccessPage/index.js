import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Paper from 'material-ui/Paper';

const enhance = translate();

const PasswordResetSuccessPage = ({ t }) => (
  <Paper className="PasswordReset">
    <p>{t('resetPassword.success')}</p>
  </Paper>
);

PasswordResetSuccessPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default enhance(PasswordResetSuccessPage);
