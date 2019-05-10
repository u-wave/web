import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
import CircularProgress from '@material-ui/core/CircularProgress';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';
import SocialLogin from './SocialLogin';
import Separator from './Separator';

const {
  useCallback,
  useRef,
  useState,
} = React;

function LoginForm({
  error,
  supportsSocialAuth,
  onLogin,
  onOpenResetPasswordDialog,
}) {
  const { t } = useTranslator();
  const [busy, setBusy] = useState(false);
  const refEmail = useRef(null);
  const refPassword = useRef(null);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setBusy(true);
    onLogin({
      email: refEmail.current.value,
      password: refPassword.current.value,
    }).finally(() => {
      setBusy(false);
    });
  }, [onLogin]);

  const handleResetPassword = useCallback((event) => {
    event.preventDefault();
    onOpenResetPasswordDialog();
  }, [onOpenResetPasswordDialog]);

  return (
    <Form className="LoginForm" onSubmit={handleSubmit}>
      {error && <FormGroup>{error.message}</FormGroup>}
      {supportsSocialAuth && (
        <React.Fragment>
          <SocialLogin />
          <Separator />
        </React.Fragment>
      )}
      <FormGroup>
        <TextField
          ref={refEmail}
          className="LoginForm-field"
          type="email"
          autocomplete="email"
          placeholder={t('login.email')}
          icon={<EmailIcon nativeColor="#9f9d9e" />}
          autoFocus
        />
      </FormGroup>

      <FormGroup>
        <TextField
          ref={refPassword}
          className="LoginForm-field"
          type="password"
          autocomplete="current-password"
          placeholder={t('login.password')}
          icon={<PasswordIcon nativeColor="#9f9d9e" />}
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
