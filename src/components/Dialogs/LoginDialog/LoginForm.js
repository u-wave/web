import * as React from 'react';
import { translate } from 'react-i18next';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import PasswordIcon from 'material-ui/svg-icons/action/lock';
import Loader from '../../Loader';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';

@translate()
export default class LoginForm extends React.Component {
  static propTypes = {
    t: React.PropTypes.func.isRequired,
    error: React.PropTypes.object,
    onLogin: React.PropTypes.func,
    onOpenResetPasswordDialog: React.PropTypes.func
  };

  state = { busy: false };

  componentWillReceiveProps() {
    this.setState({ busy: false });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ busy: true });
    this.props.onLogin({
      email: this.email.value,
      password: this.password.value
    });
  };

  handleResetPassword = (event) => {
    event.preventDefault();
    this.props.onOpenResetPasswordDialog();
  };

  refEmail = (email) => {
    this.email = email;
  };

  refPassword = (password) => {
    this.password = password;
  };

  render() {
    const { t, error } = this.props;
    const { busy } = this.state;

    return (
      <Form className="LoginForm" onSubmit={this.handleSubmit}>
        {error && <FormGroup>{error.message}</FormGroup>}
        <FormGroup>
          <TextField
            ref={this.refEmail}
            className="LoginForm-field"
            type="email"
            placeholder={t('login.email')}
            icon={<EmailIcon color="#9f9d9e" />}
            autoFocus
          />
        </FormGroup>

        <FormGroup>
          <TextField
            ref={this.refPassword}
            className="LoginForm-field"
            type="password"
            placeholder={t('login.password')}
            icon={<PasswordIcon color="#9f9d9e" />}
          />
        </FormGroup>

        <FormGroup>
          <Button
            className="LoginForm-submit"
            disabled={busy}
          >
            {busy ? <div className="Button-loading"><Loader size="tiny" /></div> : t('login.login')}
          </Button>
        </FormGroup>

        <FormGroup>
          <a href onClick={this.handleResetPassword} className="LoginForm-forgot">
            Forgot Password?
          </a>
        </FormGroup>
      </Form>
    );
  }
}
