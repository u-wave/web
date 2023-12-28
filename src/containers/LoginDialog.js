import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { resetPassword } from '../actions/LoginActionCreators';
import { register, login, finishSocialLogin } from '../reducers/auth';
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
}, dispatch);

export default connect(loginDialogSelector, mapDispatchToProps)(LoginDialog);
