import React from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import dispatcher from '../../dispatcher';
import LoginForm from './LoginForm';

/**
 * The LoginModal manages its own "open" state.
 */
export default class LoginModal extends React.Component {
  state = { open: false };

  componentDidMount() {
    this.dispatchToken = dispatcher.register(payload => {
      if (payload.action === 'openLoginModal') {
        this.open();
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
    const { open } = this.state;
    const form = (
      <LoginForm
        onLoggedIn={::this.close}
        {...this.props}
      />
    );
    const modal = (
      <div className="LoginModal">
        <h1 className="LoginModal-header">Sign in</h1>
        {form}
      </div>
    );
    return (
      <span>
        <TransitionGroup transitionName="LoginModal-showing">
          {open && modal}
        </TransitionGroup>
      </span>
    );
  }
}
