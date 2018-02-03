import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Dialog from 'material-ui/Dialog';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ResetPasswordForm from './ResetPasswordForm';
import SocialLogin from './SocialLogin';

const contentStyle = {
  maxWidth: 350
};

const bodyStyle = {
  padding: 24
};

const enhance = translate();

const Separator = () => (
  <p
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <span style={{ flexGrow: 1, height: 1, background: '#777' }} />
    <span style={{ marginLeft: 7, marginRight: 7 }}>or</span>
    <span style={{ flexGrow: 1, height: 1, background: '#777' }} />
  </p>
);

const LoginDialog = (props) => {
  const {
    t,
    open,
    show,
    onCloseDialog
  } = props;
  let form;
  let title;
  if (show === 'register') {
    title = t('login.register');
    form = <RegisterForm {...props} />;
  } else if (show === 'reset') {
    title = 'Reset Password';
    form = <ResetPasswordForm {...props} />;
  } else {
    title = t('login.login');
    form = <LoginForm {...props} />;
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
      {show !== 'reset' && (
        <React.Fragment>
          <SocialLogin />
          <Separator />
        </React.Fragment>
      )}
      {form}
    </Dialog>
  );
};

LoginDialog.propTypes = {
  t: PropTypes.func.isRequired,
  open: PropTypes.bool,
  show: PropTypes.string,
  onCloseDialog: PropTypes.func
};

export default enhance(LoginDialog);
