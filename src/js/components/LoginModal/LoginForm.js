import React from 'react';
import EmailIcon from 'material-ui/lib/svg-icons/communication/email';
import PasswordIcon from 'material-ui/lib/svg-icons/action/lock';
import { login } from '../../actions/LoginActionCreators';
import Loader from '../Loader';
import Form from '../Form';
import TextField from '../Form/TextField';
import Button from '../Form/Button';

export default class LoginForm extends React.Component {
  static propTypes = {
    error: React.PropTypes.object
  };

  state = { busy: false };

  componentWillReceiveProps() {
    this.setState({ busy: false });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ busy: true });
    login({
      email: this.refs.email.value,
      password: this.refs.password.value
    });
  }

  render() {
    const { error } = this.props;
    const { busy } = this.state;

    return (
      <Form className="LoginForm" onSubmit={::this.onSubmit}>
        {error && <Form.Group>{error.message}</Form.Group>}
        <Form.Group>
          <TextField
            ref="email"
            className="LoginForm-field"
            placeholder="E-Mail"
            icon={<EmailIcon color="#9f9d9e"/>}
          />
        </Form.Group>
        <Form.Group>
          <TextField
            ref="password"
            className="LoginForm-field"
            type="password"
            placeholder="Password"
            icon={<PasswordIcon color="#9f9d9e"/>}
          />
        </Form.Group>

        <Form.Group>
          <Button
            className="LoginForm-submit"
            disabled={busy}
          >
            {busy ? <div className="Button-loading"><Loader size="tiny" /></div> : 'SIGN IN'}
          </Button>
        </Form.Group>

        <span className="LoginForm-forgot">
          Forgot Password?
        </span>
      </Form>
    );
  }
}
