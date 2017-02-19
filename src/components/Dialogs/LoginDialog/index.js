/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';
import { translate } from 'react-i18next';
import Dialog from 'material-ui/Dialog';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ResetPasswordForm from './ResetPasswordForm';

const contentStyle = {
  maxWidth: 350
};

const bodyStyle = {
  padding: 24
};

@translate()
export default class LoginDialog extends React.Component {
  static propTypes = {
    t: React.PropTypes.func.isRequired,
    open: React.PropTypes.bool,
    show: React.PropTypes.string,
    onCloseDialog: React.PropTypes.func
  };

  render() {
    const { t, open, show, onCloseDialog } = this.props;
    let form;
    let title;
    if (show === 'register') {
      title = t('login.register');
      form = <RegisterForm {...this.props} />;
    } else if (show === 'reset') {
      title = 'Reset Password';
      form = <ResetPasswordForm {...this.props} />;
    } else {
      title = t('login.login');
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
