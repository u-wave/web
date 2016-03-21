import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { resetPassword, login, register } from '../actions/LoginActionCreators';
import { closeLoginDialog } from '../actions/DialogActionCreators';

import { loginDialogSelector } from '../selectors/dialogSelectors';
import LoginDialog from '../components/Dialogs/LoginDialog';

const mapDispatchToProps = dispatch => bindActionCreators({
  onResetPassword: resetPassword,
  onLogin: login,
  onRegister: register,
  onCloseDialog: closeLoginDialog
}, dispatch);

export default connect(loginDialogSelector, mapDispatchToProps)(LoginDialog);
