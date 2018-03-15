import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import PasswordIcon from 'material-ui/svg-icons/action/lock';
import Loader from '../../Loader';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';
import SocialLogin from './SocialLogin';
import Separator from './Separator';

const enhance = translate();

class LoginForm extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    error: PropTypes.object,
    supportsSocialAuth: PropTypes.bool,
    onLogin: PropTypes.func,
    onOpenResetPasswordDialog: PropTypes.func,
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
      password: this.password.value,
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
    const { t, error, supportsSocialAuth } = this.props;
    const { busy } = this.state;

    return (
      <Form className="LoginForm" onSubmit={this.handleSubmit}>
        {error && <FormGroup>{error.message}</FormGroup>}
        {supportsSocialAuth && (
          <React.Fragment>
            <SocialLogin />
            <Separator />
          </React.Fragment>
        )}
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

        <FormGroup className="LoginForm-forgot">
          <button onClick={this.handleResetPassword} className="LoginForm-forgotLink">
            Forgot Password?
          </button>
        </FormGroup>
      </Form>
    );
  }
}

export default enhance(LoginForm);
