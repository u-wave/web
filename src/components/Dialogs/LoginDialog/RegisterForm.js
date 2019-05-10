import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator, Interpolate } from '@u-wave/react-translate';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
import UserIcon from '@material-ui/icons/Person';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';
import ReCaptcha from '../../ReCaptcha';
import SocialLogin from './SocialLogin';
import Separator from './Separator';

const {
  useCallback,
  useRef,
  useState,
} = React;

function RegisterForm({
  useReCaptcha,
  reCaptchaSiteKey,
  supportsSocialAuth,
  error,
  onRegister,
}) {
  const { t } = useTranslator();
  const [busy, setBusy] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [captchaResponse, setResponse] = useState(null);
  const refUsername = useRef(null);
  const refEmail = useRef(null);
  const refPassword = useRef(null);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setBusy(true);
    onRegister({
      username: refUsername.value,
      email: refEmail.value,
      password: refPassword.value,
      grecaptcha: captchaResponse,
    }).finally(() => {
      setBusy(false);
    });
  }, [onRegister, captchaResponse]);

  const handleCaptchaResponse = response => setResponse(response);
  const handleTosCheckbox = (event, checked) => setAgreed(checked);

  let captcha = null;
  if (useReCaptcha) {
    captcha = (
      <FormGroup>
        <ReCaptcha
          sitekey={reCaptchaSiteKey}
          onResponse={handleCaptchaResponse}
          theme="dark"
        />
      </FormGroup>
    );
  }

  const captchaOk = !useReCaptcha || !!captchaResponse;

  return (
    <Form className="RegisterForm" onSubmit={handleSubmit}>
      {error && <FormGroup>{error.message}</FormGroup>}
      {supportsSocialAuth && (
        <React.Fragment>
          <SocialLogin />
          <Separator />
        </React.Fragment>
      )}
      <FormGroup>
        <TextField
          ref={refUsername}
          className="RegisterForm-field"
          autocomplete="nickname"
          placeholder={t('login.username')}
          icon={<UserIcon nativeColor="#9f9d9e" />}
          autoFocus
        />
      </FormGroup>
      <FormGroup>
        <TextField
          ref={refEmail}
          className="RegisterForm-field"
          type="email"
          autocomplete="email"
          placeholder={t('login.email')}
          icon={<EmailIcon nativeColor="#9f9d9e" />}
        />
      </FormGroup>
      <FormGroup>
        <TextField
          ref={refPassword}
          className="RegisterForm-field"
          type="password"
          autocomplete="new-password"
          placeholder={t('login.password')}
          icon={<PasswordIcon nativeColor="#9f9d9e" />}
        />
      </FormGroup>

      {captcha}

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
            : t('login.register')
          }
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
};

export default RegisterForm;
