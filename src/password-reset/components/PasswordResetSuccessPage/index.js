import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const enhance = translate();

const PasswordResetSuccessPage = ({ t }) => (
  <Paper className="PasswordReset">
    <Typography variant="body1">
      {t('resetPassword.success')}
    </Typography>
  </Paper>
);

PasswordResetSuccessPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default enhance(PasswordResetSuccessPage);
