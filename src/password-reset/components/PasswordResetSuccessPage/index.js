import React from 'react';
import { useTranslator } from '@u-wave/react-translate';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function PasswordResetSuccessPage() {
  const { t } = useTranslator();

  return (
    <Paper className="PasswordReset">
      <Typography variant="body1">
        {t('resetPassword.success')}
      </Typography>
    </Paper>
  );
}

export default PasswordResetSuccessPage;
