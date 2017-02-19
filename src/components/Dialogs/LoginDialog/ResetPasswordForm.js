import React from 'react';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import Loader from '../../Loader';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';

export default class ResetPasswordForm extends React.Component {
  static propTypes = {
    error: React.PropTypes.object,
    onResetPassword: React.PropTypes.func
  };

  state = { busy: false };

  componentWillReceiveProps() {
    this.setState({ busy: false });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ busy: true });
    this.props.onResetPassword({
      email: this.email.value
    });
  };

  refEmail = (email) => {
    this.email = email;
  };

  render() {
    const { error } = this.props;
    const { busy } = this.state;

    return (
      <Form className="ResetPasswordForm" onSubmit={this.handleSubmit}>
        {error && <FormGroup>{error.message}</FormGroup>}
        <FormGroup>
          <TextField
            ref={this.refEmail}
            className="ResetPasswordForm-field"
            type="email"
            placeholder="E-Mail"
            icon={<EmailIcon color="#9f9d9e" />}
          />
        </FormGroup>

        <FormGroup>
          <Button
            className="ResetPasswordForm-submit"
            disabled={busy}
          >
            {busy ? <div className="Button-loading"><Loader size="tiny" /></div> : 'RESET PASSWORD'}
          </Button>
        </FormGroup>
      </Form>
    );
  }
}
