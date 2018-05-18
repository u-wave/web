import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { translate } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ResetPasswordForm from './ResetPasswordForm';

const enhance = compose(
  translate(),
  withMobileDialog(),
);

const LoginDialog = (props) => {
  const {
    t,
    fullScreen,
    open,
    show,
    onCloseDialog,
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
      classes={{
        paper: cx('Dialog', 'LoginDialog', fullScreen && 'LoginDialog--mobile'),
      }}
      open={open}
      fullScreen={fullScreen}
      onClose={onCloseDialog}
      aria-labelledby="uw-login-title"
    >
      <DialogTitle className="Dialog-title" id="uw-login-title">
        {title}
        {fullScreen && (
          <IconButton className="Dialog-close" onClick={onCloseDialog}>
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent className="Dialog-body">
        {form}
      </DialogContent>
    </Dialog>
  );
};

LoginDialog.propTypes = {
  t: PropTypes.func.isRequired,
  open: PropTypes.bool,
  show: PropTypes.string,
  fullScreen: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};

export default enhance(LoginDialog);
