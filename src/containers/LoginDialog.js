import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  resetPassword, login, register, finishSocialLogin, registerCompleteError,
} from '../actions/LoginActionCreators';
import { openResetPasswordDialog, closeLoginDialog } from '../actions/DialogActionCreators';
import { loginDialogSelector } from '../selectors/dialogSelectors';
import LoginDialog from '../components/Dialogs/LoginDialog';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onOpenResetPasswordDialog: openResetPasswordDialog,
  onResetPassword: resetPassword,
  onLogin: login,
  onRegister: register,
  onSocialFinish: finishSocialLogin,
  onCloseDialog: closeLoginDialog,
  onRegisterError: registerCompleteError,
}, dispatch);

export default connect(loginDialogSelector, mapDispatchToProps)(LoginDialog);
