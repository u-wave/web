/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const contentStyle = {
  maxWidth: 350
};

const bodyStyle = {
  padding: 24
};

export default class LoginDialog extends Component {
  static propTypes = {
    open: PropTypes.bool,
    show: PropTypes.string,

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
        contentClassName="Dialog LoginDialog"
        bodyClassName="Dialog-body"
        titleClassName="Dialog-title"
        contentStyle={contentStyle}
        bodyStyle={bodyStyle}
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
