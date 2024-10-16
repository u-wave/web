import { useState } from 'react';
import { useTranslator } from '@u-wave/react-translate';
import { useAsyncCallback } from 'react-async-hook';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { mdiEmail } from '@mdi/js';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import SvgIcon from '../../SvgIcon';
import Button from '../../Form/Button';

export type ResetPasswordFormProps = {
  show: 'reset', // eslint-disable-line react/no-unused-prop-types
  onResetPassword: (credentials: { email: string }) => Promise<void>,
  onCloseDialog: () => void,
};
function ResetPasswordForm({ onResetPassword, onCloseDialog }: ResetPasswordFormProps) {
  const { t } = useTranslator();
  const [email, setEmail] = useState('');

  const handleSubmit = useAsyncCallback(async (event) => {
    event.preventDefault();
    await onResetPassword({ email });
  });

  if (handleSubmit.status === 'success') {
    return (
      <div>
        <p>{t('login.passwordResetSent')}</p>
        <p>
          <Button className="ResetPasswordForm-submit" onClick={onCloseDialog}>
            {t('close')}
          </Button>
        </p>
      </div>
    );
  }

  return (
    <Form className="ResetPasswordForm" onSubmit={handleSubmit.execute}>
      {handleSubmit.error && (
        <FormGroup>
          <Alert severity="error">{handleSubmit.error.message}</Alert>
        </FormGroup>
      )}
      <FormGroup>
        <label className="FormGroup-label" htmlFor="reset-email">
          {t('login.email')}
        </label>
        <TextField
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          id="reset-email"
          className="ResetPasswordForm-field"
          type="email"
          autoComplete="email"
          icon={<SvgIcon path={mdiEmail} />}
        />
      </FormGroup>

      <FormGroup>
        <Button
          className="ResetPasswordForm-submit"
          disabled={handleSubmit.loading}
        >
          {handleSubmit.loading ? (
            <div className="Button-loading"><CircularProgress size="100%" /></div>
          ) : t('login.requestPasswordReset')}
        </Button>
      </FormGroup>
    </Form>
  );
}

export default ResetPasswordForm;
