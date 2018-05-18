import React from 'react';
import PropTypes from 'prop-types';
import { translate, Interpolate } from 'react-i18next';
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

const enhance = translate();

class RegisterForm extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    useReCaptcha: PropTypes.bool,
    reCaptchaSiteKey: PropTypes.string,
    supportsSocialAuth: PropTypes.bool,
    error: PropTypes.object,

    onRegister: PropTypes.func,
  };

  state = {
    busy: false,
    agreed: false,
    captchaResponse: null,
  };

  componentWillReceiveProps() {
    this.setState({ busy: false });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ busy: true });
    this.props.onRegister({
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
      grecaptcha: this.state.captchaResponse,
    });
  };

  handleCaptchaResponse = (response) => {
    this.setState({
      captchaResponse: response,
    });
  };

  handleTosCheckbox = (event, checked) => {
    this.setState({
      agreed: checked,
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

  renderCaptcha() {
    if (!this.props.useReCaptcha) {
      return null;
    }
    return (
      <FormGroup>
        <ReCaptcha
          sitekey={this.props.reCaptchaSiteKey}
          onResponse={this.handleCaptchaResponse}
          theme="dark"
        />
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
        {error && <FormGroup>{error.message}</FormGroup>}
        {supportsSocialAuth && (
          <React.Fragment>
            <SocialLogin />
            <Separator />
          </React.Fragment>
        )}
        <FormGroup>
          <TextField
            ref={this.refUsername}
            className="RegisterForm-field"
            placeholder={t('login.username')}
            icon={<UserIcon nativeColor="#9f9d9e" />}
            autoFocus
          />
        </FormGroup>
        <FormGroup>
          <TextField
            ref={this.refEmail}
            className="RegisterForm-field"
            type="email"
            placeholder={t('login.email')}
            icon={<EmailIcon nativeColor="#9f9d9e" />}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            ref={this.refPassword}
            className="RegisterForm-field"
            type="password"
            placeholder={t('login.password')}
            icon={<PasswordIcon nativeColor="#9f9d9e" />}
          />
        </FormGroup>

        {this.renderCaptcha()}

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreed}
                onChange={this.handleTosCheckbox}
              />
            }
            label={
              <Interpolate
                i18nKey="login.agree"
                privacyPolicy={
                  <a target="_blank" rel="noreferrer noopener" href="/privacy.html">
                    {t('login.privacyPolicy')}
                  </a>
                }
              />
            }
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
}

export default enhance(RegisterForm);
