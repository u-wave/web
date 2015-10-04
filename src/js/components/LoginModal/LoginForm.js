import React from 'react';
import { login } from '../../utils/Auth';
import Loader from '../Loader';
import Form from '../Form';
import TextField from '../Form/TextField';
import Button from '../Form/Button';

export default class LoginForm extends React.Component {
  static propTypes = {
    onLoggedIn: React.PropTypes.func.isRequired
  };

  state = { busy: false, error: null };

  onSubmit(event) {
    event.preventDefault();
    this.setState({ busy: true });
    login({
      email: this.refs.email.value,
      password: this.refs.password.value
    })
      .then(() => {
        this.props.onLoggedIn();
        this.setState({ error: null });
      })
      .catch(err => {
        this.setState({ error: err.message });
      })
      .finally(() => {
        this.setState({ busy: false });
      });
  }

  render() {
    const { busy, error } = this.state;

    return (
      <Form className="LoginForm" onSubmit={::this.onSubmit}>
        {error && <Form.Group>{error}</Form.Group>}
        <Form.Group>
          <TextField
            ref="email"
            className="LoginForm-field"
            placeholder="E-Mail"
            icon="email"
          />
        </Form.Group>
        <Form.Group>
          <TextField
            ref="password"
            className="LoginForm-field"
            type="password"
            placeholder="Password"
            icon="lock"
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
