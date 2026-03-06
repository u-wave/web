import { useTranslator } from '@u-wave/react-translate';
import Typography from '@mui/material/Typography';
import Paper from '../../../components/Paper';

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
