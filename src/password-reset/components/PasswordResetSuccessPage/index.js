import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Paper from 'material-ui-next/Paper'; // eslint-disable-line
import Typography from 'material-ui-next/Typography'; // eslint-disable-line

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
