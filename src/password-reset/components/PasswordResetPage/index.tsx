import { useState } from 'react';
import { useAsyncCallback } from 'react-async-hook';
import { useTranslator } from '@u-wave/react-translate';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { mdiEmail, mdiLock } from '@mdi/js';
import Form from '../../../components/Form';
import FormGroup from '../../../components/Form/Group';
import TextField from '../../../components/Form/TextField';
import Button from '../../../components/Form/Button';
import SvgIcon from '../../../components/SvgIcon';
import uwFetch from '../../../utils/fetch';

type PasswordResetPageProps = {
  resetKey: string,
  email?: string,
  onSuccess: () => void,
};
function PasswordResetPage({ resetKey, email, onSuccess }: PasswordResetPageProps) {
  const { t } = useTranslator();
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const valid = newPassword.length >= 6 && newPassword === newPasswordConfirm;
  const handleSubmit = useAsyncCallback(async () => {
    if (!valid) {
      return;
    }

    await uwFetch([`/auth/password/reset/${resetKey}`, {
      method: 'post',
      data: { password: newPassword },
    }]);

    onSuccess();
  });

  return (
    <Paper className="PasswordReset">
      <Form onSubmit={handleSubmit.execute}>
        <FormGroup>
          <Typography>
            {t('resetPassword.introduction')}
          </Typography>
        </FormGroup>
        {email && (
          // Not used at the moment, but we may show (parts of) the user's
          // email address on the reset page at some point.
          <FormGroup>
            <TextField
              type="email"
              disabled
              value={email}
              placeholder={t('login.email')}
              icon={<SvgIcon path={mdiEmail} />}
            />
          </FormGroup>
        )}
        <FormGroup>
          <TextField
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder={t('login.password')}
            icon={<SvgIcon path={mdiLock} />}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            type="password"
            autoComplete="new-password"
            value={newPasswordConfirm}
            onChange={(event) => setNewPasswordConfirm(event.target.value)}
            placeholder={t('login.password')}
            icon={<SvgIcon path={mdiLock} />}
          />
        </FormGroup>
        <FormGroup>
          <Button disabled={!valid || handleSubmit.loading}>
            {t('resetPassword.submit')}
          </Button>
        </FormGroup>
      </Form>
    </Paper>
  );
}

export default PasswordResetPage;
