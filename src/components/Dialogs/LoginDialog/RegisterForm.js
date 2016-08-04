import * as React from 'react';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import PasswordIcon from 'material-ui/svg-icons/action/lock';
import UserIcon from 'material-ui/svg-icons/social/person';

import Loader from '../../Loader';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';

import ReCaptcha from '../../ReCaptcha';

export default class RegisterForm extends React.Component {
  static propTypes = {
    useReCaptcha: React.PropTypes.bool,
    reCaptchaSiteKey: React.PropTypes.string,
    error: React.PropTypes.object,

    onRegister: React.PropTypes.func
  };

  state = {
    busy: false,
    captchaResponse: null
  };

  componentWillReceiveProps() {
    this.setState({ busy: false });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ busy: true });
    this.props.onRegister({
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
      grecaptcha: this.state.captchaResponse
    });
  };

  handleCaptchaResponse = response => {
    this.setState({
      captchaResponse: response
    });
  };

  refUsername = username => {
    this.username = username;
  };

  refEmail = email => {
    this.email = email;
  };

  refPassword = password => {
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
        />
      </FormGroup>
    );
  }

  render() {
    const { error } = this.props;
    const { busy } = this.state;

    return (
      <Form className="RegisterForm" onSubmit={this.handleSubmit}>
        {error && <FormGroup>{error.message}</FormGroup>}
        <FormGroup>
          <TextField
            ref={this.refUsername}
            className="RegisterForm-field"
            placeholder="Username"
            icon={<UserIcon color="#9f9d9e" />}
            autofocus
          />
        </FormGroup>
        <FormGroup>
          <TextField
            ref={this.refEmail}
            className="RegisterForm-field"
            type="email"
            placeholder="E-Mail"
            icon={<EmailIcon color="#9f9d9e" />}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            ref={this.refPassword}
            className="RegisterForm-field"
            type="password"
            placeholder="Password"
            icon={<PasswordIcon color="#9f9d9e" />}
          />
        </FormGroup>

        {this.renderCaptcha()}

        <FormGroup>
          <Button
            className="RegisterForm-submit"
            disabled={busy}
          >
            {busy ? <div className="Button-loading"><Loader size="tiny" /></div> : 'REGISTER'}
          </Button>
        </FormGroup>
      </Form>
    );
  }
}
