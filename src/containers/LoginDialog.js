import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import {
  register,
  login,
  finishSocialLogin,
  resetPassword,
} from '../reducers/auth';
import { openResetPasswordDialog, closeLoginDialog } from '../actions/DialogActionCreators';
import { loginDialogSelector } from '../reducers/dialogs';
import { reCaptchaSiteKeySelector } from '../reducers/config';
import { supportsSocialAuthSelector } from '../selectors/userSelectors';
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
  onOpenResetPasswordDialog: openResetPasswordDialog,
  onResetPassword: resetPassword,
  onLogin: login,
  onRegister: register,
  onSocialFinish: finishSocialLogin,
  onCloseDialog: closeLoginDialog,
}, dispatch);

export default connect(selector, mapDispatchToProps)(LoginDialog);
