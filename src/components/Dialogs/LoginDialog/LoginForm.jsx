import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import { useAsyncCallback } from 'react-async-hook';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import { mdiEmail, mdiLock } from '@mdi/js';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';
import SvgIcon from '../../SvgIcon';
import SocialLogin from './SocialLogin';

const { useCallback, useState } = React;

function LoginForm({
  supportsSocialAuth,
  onCloseDialog,
  onLogin,
  onOpenResetPasswordDialog,
}) {
  const { t } = useTranslator();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useAsyncCallback(async (event) => {
    event.preventDefault();
    const result = await onLogin({ email, password });
    if (!result.error) {
      onCloseDialog();
    }
  }, [onLogin, email, password]);

  const handleResetPassword = useCallback((event) => {
    event.preventDefault();
    onOpenResetPasswordDialog();
  }, [onOpenResetPasswordDialog]);

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);
  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  return (
    <Form className="LoginForm" onSubmit={handleSubmit.execute}>
      {handleSubmit.error && (
        <FormGroup>
          <Alert severity="error">{handleSubmit.error.message}</Alert>
        </FormGroup>
      )}
      {supportsSocialAuth && (
        <>
          <FormGroup>
            <SocialLogin />
          </FormGroup>
          <Divider>or</Divider>
        </>
      )}
      <FormGroup>
        <label className="FormGroup-label" htmlFor="login-email">
          {t('login.email')}
        </label>
        <TextField
          id="login-email"
          className="LoginForm-field"
          type="email"
          autoComplete="email"
          icon={<SvgIcon path={mdiEmail} />}
          autoFocus
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <label className="FormGroup-label" htmlFor="login-password">
          {t('login.password')}
        </label>
        <TextField
          id="login-password"
          className="LoginForm-field"
          type="password"
          autoComplete="current-password"
          icon={<SvgIcon path={mdiLock} />}
          value={password}
          onChange={handlePasswordChange}
        />
      </FormGroup>

      <FormGroup>
        <Button
          className="LoginForm-submit"
          disabled={handleSubmit.loading}
        >
          {handleSubmit.loading ? (
            <div className="Button-loading">
              <CircularProgress size="100%" />
            </div>
          ) : t('login.login')}
        </Button>
      </FormGroup>

      <FormGroup className="LoginForm-forgot">
        <a
          href="#forgot"
          onClick={handleResetPassword}
          className="LoginForm-forgotLink"
        >
          {t('login.forgotPassword')}
        </a>
      </FormGroup>
    </Form>
  );
}

LoginForm.propTypes = {
  supportsSocialAuth: PropTypes.bool,
  onCloseDialog: PropTypes.func,
  onLogin: PropTypes.func,
  onOpenResetPasswordDialog: PropTypes.func,
};

export default LoginForm;
