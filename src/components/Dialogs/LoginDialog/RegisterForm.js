import React from 'react';
import PropTypes from 'prop-types';
import { translate, Interpolate } from '@u-wave/react-translate';
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

const enhance = translate();

class RegisterForm extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    useReCaptcha: PropTypes.bool,
    reCaptchaSiteKey: PropTypes.string,
    supportsSocialAuth: PropTypes.bool,
    error: PropTypes.object,

    onRegister: PropTypes.func,
    onRegisterError: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      busy: false,
      agreed: false,
      captchaResponse: null,
    };
  }

  handleSubmit = (event) => {
    const { t, onRegister, onRegisterError } = this.props;
    const { captchaResponse } = this.state;

    event.preventDefault();

    if (this.password.value !== this.passwordConfirmation.value) {
      onRegisterError(new Error(t('login.passwordMismatch')));
      return;
    }

    this.setState({ busy: true });
    onRegister({
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
      grecaptcha: captchaResponse,
    }).finally(() => {
      this.setState({ busy: false });
    });
  };

  handleCaptchaResponse = (response) => {
    this.setState({
      captchaResponse: response,
    });
  };

  handleTosCheckbox = (event) => {
    this.setState({
      agreed: event.target.checked,
    });
  };

  refUsername = (username) => {
    this.username = username;
  };

  refEmail = (email) => {
    this.email = email;
  };

  refPassword = (password) => {
    this.password = password;
  };

  refPasswordConfirmation = (password) => {
    this.passwordConfirmation = password;
  };

  renderCaptcha() {
    const { useReCaptcha, reCaptchaSiteKey } = this.props;

    if (!useReCaptcha) {
      return null;
    }
    return (
      <FormGroup>
        <React.Suspense fallback={<CircularProgress className="ReCaptcha-spinner" />}>
          <ReCaptcha
            sitekey={reCaptchaSiteKey}
            onResponse={this.handleCaptchaResponse}
            theme="dark"
          />
        </React.Suspense>
      </FormGroup>
    );
  }

  render() {
    const {
      t, error, supportsSocialAuth, useReCaptcha,
    } = this.props;
    const { agreed, busy, captchaResponse } = this.state;
    const captchaOk = !useReCaptcha || !!captchaResponse;

    return (
      <Form className="RegisterForm" onSubmit={this.handleSubmit}>
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
            ref={this.refUsername}
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
            ref={this.refEmail}
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
            ref={this.refPassword}
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
            ref={this.refPasswordConfirmation}
            id="register-confirm"
            className="RegisterForm-field"
            type="password"
            autoComplete="new-password"
            icon={<PasswordIcon htmlColor="#9f9d9e" />}
          />
        </FormGroup>

        {this.renderCaptcha()}

        <FormGroup>
          <FormControlLabel
            control={(
              <Checkbox
                checked={agreed}
                onChange={this.handleTosCheckbox}
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
}

export default enhance(RegisterForm);
