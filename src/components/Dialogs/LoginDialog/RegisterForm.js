import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator, Interpolate } from '@u-wave/react-translate';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Lock';
import UserIcon from '@mui/icons-material/Person';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';
import ReCaptcha from '../../ReCaptcha';
import SocialLogin from './SocialLogin';

const {
  useState,
} = React;

function RegisterForm({
  useReCaptcha,
  reCaptchaSiteKey,
  supportsSocialAuth,
  error,
  onRegister,
  onRegisterError,
}) {
  const { t } = useTranslator();
  const [busy, setBusy] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [captchaResponse, setCaptchaResponse] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      onRegisterError(new Error(t('login.passwordMismatch')));
      return;
    }

    setBusy(true);
    onRegister({
      username,
      email,
      password,
      grecaptcha: captchaResponse,
    }).finally(() => {
      setBusy(false);
    });
  };

  const handleTosCheckbox = (event) => {
    setAgreed(event.target.checked);
  };

  const captchaOk = !useReCaptcha || !!captchaResponse;

  return (
    <Form className="RegisterForm" onSubmit={handleSubmit}>
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
        <label className="FormGroup-label" htmlFor="register-username">
          {t('login.username')}
        </label>
        <TextField
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          id="register-username"
          className="RegisterForm-field"
          autoComplete="nickname"
          icon={<UserIcon htmlColor="#9f9d9e" />}
          autoFocus
        />
      </FormGroup>
      <FormGroup>
        <label className="FormGroup-label" htmlFor="register-email">
          {t('login.email')}
        </label>
        <TextField
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          id="register-email"
          className="RegisterForm-field"
          type="email"
          autoComplete="email"
          icon={<EmailIcon htmlColor="#9f9d9e" />}
        />
      </FormGroup>
      <FormGroup>
        <label className="FormGroup-label" htmlFor="register-password">
          {t('login.password')}
        </label>
        <TextField
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          id="register-password"
          className="RegisterForm-field"
          type="password"
          autoComplete="new-password"
          icon={<PasswordIcon htmlColor="#9f9d9e" />}
        />
      </FormGroup>
      <FormGroup>
        <label className="FormGroup-label" htmlFor="register-confirm">
          {t('login.passwordConfirmation')}
        </label>
        <TextField
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          id="register-confirm"
          className="RegisterForm-field"
          type="password"
          autoComplete="new-password"
          icon={<PasswordIcon htmlColor="#9f9d9e" />}
        />
      </FormGroup>

      {useReCaptcha ? (
        <FormGroup>
          <React.Suspense fallback={<CircularProgress className="ReCaptcha-spinner" />}>
            <ReCaptcha
              sitekey={reCaptchaSiteKey}
              onResponse={setCaptchaResponse}
              theme="dark"
            />
          </React.Suspense>
        </FormGroup>
      ) : null}

      <FormGroup>
        <FormControlLabel
          control={(
            <Checkbox
              checked={agreed}
              onChange={handleTosCheckbox}
            />
          )}
          label={(
            <Interpolate
              i18nKey="login.agree"
              privacyPolicy={(
                <a target="_blank" rel="noreferrer noopener" href="/privacy.html">
                  {t('login.privacyPolicy')}
                </a>
              )}
            />
          )}
        />
      </FormGroup>

      <FormGroup>
        <Button
          className="RegisterForm-submit"
          disabled={busy || !agreed || !captchaOk}
        >
          {busy
            ? <div className="Button-loading"><CircularProgress size="100%" /></div>
            : t('login.register')}
        </Button>
      </FormGroup>
    </Form>
  );
}

RegisterForm.propTypes = {
  useReCaptcha: PropTypes.bool,
  reCaptchaSiteKey: PropTypes.string,
  supportsSocialAuth: PropTypes.bool,
  error: PropTypes.object,

  onRegister: PropTypes.func,
  onRegisterError: PropTypes.func,
};

export default RegisterForm;
