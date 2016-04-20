/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/lib/dialog';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default class LoginDialog extends Component {
  static propTypes = {
    open: PropTypes.bool,
    show: PropTypes.string,
    error: PropTypes.string,

    onLogin: PropTypes.func,
    onRegister: PropTypes.func,
    onCloseDialog: PropTypes.func
  };

  render() {
    const { open, show, onCloseDialog } = this.props;
    let form;
    let title;
    if (show === 'register') {
      title = 'Register';
      form = <RegisterForm {...this.props} />;
    } else {
      title = 'Sign in';
      form = <LoginForm {...this.props} />;
    }
    return (
      <Dialog
        contentStyle={{ maxWidth: 350 }}
        title={title}
        open={open}
        onRequestClose={onCloseDialog}
        autoScrollBodyContent
      >
        {form}
      </Dialog>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
