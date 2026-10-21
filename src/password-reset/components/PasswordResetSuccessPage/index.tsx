import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTranslator } from '@u-wave/react-translate';

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
