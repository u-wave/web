import React from 'react';
import { register } from '../../actions/LoginActionCreators';
import Loader from '../Loader';
import Form from '../Form';
import TextField from '../Form/TextField';
import Button from '../Form/Button';

export default class RegisterForm extends React.Component {
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
    register({
      username: this.refs.username.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    });
  }

  render() {
    const { error } = this.props;
    const { busy } = this.state;

    return (
      <Form className="RegisterForm" onSubmit={::this.onSubmit}>
        {error && <Form.Group>{error.message}</Form.Group>}
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
