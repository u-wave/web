import React, { Component, PropTypes } from 'react';
import TransitionGroup from 'react-addons-css-transition-group';
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
    const modal = (
      <div className="LoginModal">
        <h1 className="LoginModal-header">{title}</h1>
        {form}
      </div>
    );
    return (
      <span>
        <TransitionGroup
          transitionName="LoginModal-showing"
          transitionEnterTimeout={230}
          transitionLeaveTimeout={230}
        >
          {open && modal}
        </TransitionGroup>
      </span>
    );
  }
}
