import React from 'react';
import { register } from '../../utils/Auth';
import Loader from '../Loader';
import Form from '../Form';
import TextField from '../Form/TextField';
import Button from '../Form/Button';

export default class RegisterForm extends React.Component {
  static propTypes = {
    onRegistered: React.PropTypes.func.isRequired
  };

  state = { busy: false, error: null };

  onSubmit(event) {
    event.preventDefault();
    this.setState({ busy: true });
    register({
      username: this.refs.username.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    })
      .then(() => {
        this.props.onRegistered();
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
      <Form className="RegisterForm" onSubmit={::this.onSubmit}>
        {error && <Form.Group>{error}</Form.Group>}
        <Form.Group>
          <TextField
            ref="username"
            className="RegisterForm-field"
            placeholder="Username"
            icon="person"
          />
        </Form.Group>
        <Form.Group>
          <TextField
            ref="email"
            className="RegisterForm-field"
            placeholder="E-Mail"
            icon="email"
          />
        </Form.Group>
        <Form.Group>
          <TextField
            ref="password"
            className="RegisterForm-field"
            type="password"
            placeholder="Password"
            icon="lock"
          />
        </Form.Group>

        <Form.Group>
          <Button
            className="RegisterForm-submit"
            disabled={busy}
          >
            {busy ? <div className="Button-loading"><Loader size="tiny" /></div> : 'REGISTER'}
          </Button>
        </Form.Group>
      </Form>
    );
  }
}
