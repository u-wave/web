import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/core/Alert';
import Divider from '@material-ui/core/Divider';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';
import SocialLogin from './SocialLogin';

const { useCallback, useState } = React;

function LoginForm({
  error,
  supportsSocialAuth,
  onLogin,
  onOpenResetPasswordDialog,
}) {
  const { t } = useTranslator();
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setBusy(true);
    onLogin({ email, password }).catch(() => {
      // ignore
    }).finally(() => {
      setBusy(false);
    });
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
    <Form className="LoginForm" onSubmit={handleSubmit}>
      {error && (
        <FormGroup>
          <Alert severity="error">{error.message}</Alert>
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
          icon={<EmailIcon htmlColor="#9f9d9e" />}
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
          icon={<PasswordIcon htmlColor="#9f9d9e" />}
          value={password}
          onChange={handlePasswordChange}
        />
      </FormGroup>

      <FormGroup>
        <Button
          className="LoginForm-submit"
          disabled={busy}
        >
          {busy ? (
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
  error: PropTypes.object,
  supportsSocialAuth: PropTypes.bool,
  onLogin: PropTypes.func,
  onOpenResetPasswordDialog: PropTypes.func,
};

export default LoginForm;
