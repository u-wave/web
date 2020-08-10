import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetPassword, login, register, finishSocialLogin } from '../actions/LoginActionCreators';
import { openResetPasswordDialog, closeLoginDialog } from '../actions/DialogActionCreators';
import { loginDialogSelector } from '../selectors/dialogSelectors';
import LoginDialog from '../components/Dialogs/LoginDialog';

const {
  useCallback,
} = React;

function LoginDialogContainer() {
  const props = useSelector(loginDialogSelector);
  const dispatch = useDispatch();
  const onOpenResetPasswordDialog = useCallback(() => dispatch(openResetPasswordDialog()), []);
  const onResetPassword = useCallback((email) => dispatch(resetPassword(email)), []);
  const onLogin = useCallback((data) => dispatch(login(data)), []);
  const onRegister = useCallback((data) => dispatch(register(data)), []);
  const onSocialFinish = useCallback((service, data) =>  dispatch(finishSocialLogin(service, data)), []);
  const onCloseDialog = useCallback(() => dispatch(closeLoginDialog()), []);

  return (
    <LoginDialog
      {...props}
      onOpenResetPasswordDialog={onOpenResetPasswordDialog}
      onResetPassword={onResetPassword}
      onLogin={onLogin}
      onRegister={onRegister}
      onSocialFinish={onSocialFinish}
      onCloseDialog={onCloseDialog}
    />
  );
}

export default LoginDialogContainer;
