import * as React from 'react';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import PasswordIcon from 'material-ui/svg-icons/action/lock';
import Loader from '../../Loader';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';

export default class LoginForm extends React.Component {
  static propTypes = {
    error: React.PropTypes.object,
    onLogin: React.PropTypes.func
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

  refEmail = (email) => {
    this.email = email;
  };

  refPassword = (password) => {
    this.password = password;
  };

  render() {
    const { error } = this.props;
    const { busy } = this.state;

    return (
      <Form className="LoginForm" onSubmit={this.handleSubmit}>
        {error && <FormGroup>{error.message}</FormGroup>}
        <FormGroup>
          <TextField
            ref={this.refEmail}
            className="LoginForm-field"
            type="email"
            placeholder="E-Mail"
            icon={<EmailIcon color="#9f9d9e" />}
            autofocus
          />
        </FormGroup>
        <FormGroup>
          <TextField
            ref={this.refPassword}
            className="LoginForm-field"
            type="password"
            placeholder="Password"
            icon={<PasswordIcon color="#9f9d9e" />}
          />
        </FormGroup>

        <FormGroup>
          <Button
            className="LoginForm-submit"
            disabled={busy}
          >
            {busy ? <div className="Button-loading"><Loader size="tiny" /></div> : 'SIGN IN'}
          </Button>
        </FormGroup>

        <span className="LoginForm-forgot">
          Forgot Password?
        </span>
      </Form>
    );
  }
}
