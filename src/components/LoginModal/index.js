import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/lib/dialog';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

/**
 * The LoginModal manages its own "open" state.
 */
export default class LoginModal extends Component {
  static propTypes = {
    open: PropTypes.bool,
    show: PropTypes.string,
    error: PropTypes.string,

    onLogin: PropTypes.func,
    onRegister: PropTypes.func
  };

  render() {
    const { open, show } = this.props;
    let form;
    let title;
    if (show === 'register') {
      title = 'Register';
      form = (
        <RegisterForm
          key="register"
          {...this.props}
        />
      );
    } else {
      title = 'Sign in';
      form = (
        <LoginForm
          key="login"
          {...this.props}
        />
      );
    }
    return (
      <Dialog className="LoginModal" open={open}>
        <h1 className="LoginModal-header">{title}</h1>
        {form}
      </Dialog>
    );
  }
}
