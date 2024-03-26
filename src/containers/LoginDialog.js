import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import {
  register,
  login,
  finishSocialLogin,
  resetPassword,
  supportsSocialAuthSelector,
} from '../reducers/auth';
import { loginDialogSelector, openLoginDialog, closeLoginDialog } from '../reducers/dialogs';
import { reCaptchaSiteKeySelector } from '../reducers/config';
import LoginDialog from '../components/Dialogs/LoginDialog';

const selector = createSelector(
  [loginDialogSelector, reCaptchaSiteKeySelector, supportsSocialAuthSelector],
  (props, siteKey, supportsSocialAuth) => ({
    ...props,
    useReCaptcha: !!siteKey,
    reCaptchaSiteKey: siteKey ?? null,
    supportsSocialAuth,
  }),
);

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onOpenResetPasswordDialog: () => openLoginDialog({ show: 'reset' }),
  onResetPassword: resetPassword,
  onLogin: login,
  onRegister: register,
  onSocialFinish: finishSocialLogin,
  onCloseDialog: closeLoginDialog,
}, dispatch);

export default connect(selector, mapDispatchToProps)(LoginDialog);
