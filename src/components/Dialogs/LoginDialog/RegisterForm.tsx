import { useState, Suspense } from 'react';
import { useTranslator, Interpolate } from '@u-wave/react-translate';
import { useAsyncCallback } from 'react-async-hook';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { mdiEmail, mdiLock, mdiAccount } from '@mdi/js';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';
import SvgIcon from '../../SvgIcon';
import ReCaptcha from '../../ReCaptcha';
import SocialLogin from './SocialLogin';

export type RegisterFormProps = {
  show: 'register', // eslint-disable-line react/no-unused-prop-types
  reCaptchaSiteKey?: string,
  supportsSocialAuth: boolean,
  onCloseDialog: () => void,
  onRegister: (credentials: {
    username: string,
    email: string,
    password: string,
    grecaptcha?: string | null | undefined,
  }) => Promise<void>,
};
function RegisterForm({
  reCaptchaSiteKey,
  supportsSocialAuth,
  onCloseDialog,
  onRegister,
}: RegisterFormProps) {
  const { t } = useTranslator();
  const [agreed, setAgreed] = useState(false);
  const [captchaResponse, setCaptchaResponse] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = useAsyncCallback(async (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      throw new Error(t('login.passwordMismatch'));
    }

    await onRegister({
      username,
      email,
      password,
      grecaptcha: captchaResponse,
    });
    onCloseDialog();
  });

  const handleTosCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(event.currentTarget.checked);
  };

  const captchaOk = reCaptchaSiteKey == null || !!captchaResponse;

  return (
    <Form className="RegisterForm" onSubmit={handleSubmit.execute}>
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
        <label className="FormGroup-label" htmlFor="register-username">
          {t('login.username')}
        </label>
        <TextField
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          id="register-username"
          className="RegisterForm-field"
          autoComplete="nickname"
          icon={<SvgIcon path={mdiAccount} />}
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
          icon={<SvgIcon path={mdiEmail} />}
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
          icon={<SvgIcon path={mdiLock} />}
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
          icon={<SvgIcon path={mdiLock} />}
        />
      </FormGroup>

      {reCaptchaSiteKey != null ? (
        <FormGroup>
          <Suspense fallback={<CircularProgress className="ReCaptcha-spinner" />}>
            <ReCaptcha
              sitekey={reCaptchaSiteKey}
              onResponse={setCaptchaResponse}
              theme="dark"
            />
          </Suspense>
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
          disabled={handleSubmit.loading || !agreed || !captchaOk}
        >
          {handleSubmit.loading
            ? <div className="Button-loading"><CircularProgress size="100%" /></div>
            : t('login.register')}
        </Button>
      </FormGroup>
    </Form>
  );
}

export default RegisterForm;
