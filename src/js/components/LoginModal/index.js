import React from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import dispatcher from '../../dispatcher';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

/**
 * The LoginModal manages its own "open" state.
 */
export default class LoginModal extends React.Component {
  state = { open: false, register: false };

  componentDidMount() {
    this.dispatchToken = dispatcher.register(({ type, meta }) => {
      if (type === 'openLoginModal') {
        this.open();
        this.setState({ register: meta.register });
      }
    });
  }

  open() {
    this.setState({ open: true });
  }
  close() {
    this.setState({ open: false });
  }

  render() {
    const { open, register } = this.state;
    let form;
    let title;
    if (register) {
      title = 'Register';
      form = (
        <RegisterForm
          key="register"
          onRegistered={::this.close}
          {...this.props}
        />
      );
    } else {
      title = 'Sign in';
      form = (
        <LoginForm
          key="login"
          onLoggedIn={::this.close}
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
