import React from 'react';
import EmailIcon from 'material-ui/lib/svg-icons/communication/email';
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

  onSubmit(event) {
    event.preventDefault();
    this.setState({ busy: true });
    this.props.onResetPassword({
      email: this.refs.email.value
    });
  }

  render() {
    const { error } = this.props;
    const { busy } = this.state;

    return (
      <Form className="ResetPasswordForm" onSubmit={::this.onSubmit}>
        {error && <FormGroup>{error.message}</FormGroup>}
        <FormGroup>
          <TextField
            ref="email"
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
            {busy ? <div className="Button-loading"><Loader size="tiny" /></div> : 'RESETPASSWORD'}
          </Button>
        </FormGroup>
      </Form>
    );
  }
}
