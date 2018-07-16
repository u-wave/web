import React from 'react';
import PropTypes from 'prop-types';
import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-i18next';
import Form from '../../../components/Form';
import FormGroup from '../../../components/Form/Group';
import TextField from '../../../components/Form/TextField';
import Button from '../../../components/Form/Button';

const enhance = translate();

class PasswordResetPage extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    newPassword: '',
    newPasswordConfirm: '',
  };

  handlePasswordChange = (event) => {
    this.setState({
      newPassword: event.target.value,
    });
  };

  handlePasswordConfirmChange = (event) => {
    this.setState({
      newPasswordConfirm: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const { onSubmit } = this.props;
    const { newPassword } = this.state;

    event.preventDefault();

    if (this.isValid()) {
      onSubmit(newPassword);
    }
  };

  isValid() {
    const { newPassword, newPasswordConfirm } = this.state;

    return newPassword.length >= 6
      && newPassword === newPasswordConfirm;
  }

  render() {
    const { t, email } = this.props;
    const { newPassword, newPasswordConfirm } = this.state;
    const isValid = this.isValid();

    return (
      <Paper className="PasswordReset">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Typography>
              {t('resetPassword.introduction')}
            </Typography>
          </FormGroup>
          {email && (
            // Not used at the moment, but we may show (parts of) the user's
            // email address on the reset page at some point.
            <FormGroup>
              <TextField
                type="email"
                disabled
                value={email}
                placeholder={t('login.email')}
                icon={<EmailIcon nativeColor="#9f9d9e" />}
              />
            </FormGroup>
          )}
          <FormGroup>
            <TextField
              type="password"
              autocomplete="new-password"
              value={newPassword}
              onChange={this.handlePasswordChange}
              placeholder={t('login.password')}
              icon={<PasswordIcon nativeColor="#9f9d9e" />}
            />
          </FormGroup>
          <FormGroup>
            <TextField
              type="password"
              autocomplete="new-password"
              value={newPasswordConfirm}
              onChange={this.handlePasswordConfirmChange}
              placeholder={t('login.password')}
              icon={<PasswordIcon nativeColor="#9f9d9e" />}
            />
          </FormGroup>
          <FormGroup>
            <Button disabled={!isValid}>
              {t('resetPassword.submit')}
            </Button>
          </FormGroup>
        </Form>
      </Paper>
    );
  }
}

export default enhance(PasswordResetPage);
