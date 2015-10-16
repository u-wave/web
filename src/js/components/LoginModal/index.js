import React from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import dispatcher from '../../dispatcher';
import LoginStore from '../../stores/LoginStore';
import listen from '../../utils/listen';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function getState() {
  return {
    error: LoginStore.getError(),
    user: LoginStore.getUser()
  };
}

/**
 * The LoginModal manages its own "open" state.
 */
@listen(LoginStore)
export default class LoginModal extends React.Component {
  state = { open: false, register: false, ...getState() };

  componentDidMount() {
    this.dispatchToken = dispatcher.register(({ type, meta, error }) => {
      if (type === 'openLoginModal') {
        this.open();
        this.setState({ register: meta.register });
      } else if (type === 'loginComplete' && !error) {
        this.close();
      }
    });
  }

  onChange() {
    this.setState(getState());
  }

  open() {
    this.setState({ open: true });
  }
  close() {
    this.setState({ open: false });
  }

  render() {
    const { open, register, error } = this.state;
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
          error={error}
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
