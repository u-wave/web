import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogCloseAnimation from '../../DialogCloseAnimation';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import SocialForm from './SocialForm';
import ResetPasswordForm from './ResetPasswordForm';

const enhance = withMobileDialog();

/* eslint-disable react/jsx-props-no-spreading */
function LoginDialog(props) {
  const { t } = useTranslator();

  const {
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
  } else if (show === 'social') {
    title = 'Sign Up With Google';
    form = <SocialForm {...props} />;
  } else if (show === 'reset') {
    title = 'Reset Password';
    form = <ResetPasswordForm {...props} />;
  } else {
    title = t('login.login');
    form = <LoginForm {...props} />;
  }

  return (
    <DialogCloseAnimation delay={450}>
      {open ? (
        <Dialog
          classes={{
            paper: cx('Dialog', 'LoginDialog', fullScreen && 'LoginDialog--mobile'),
          }}
          fullScreen={fullScreen}
          onClose={onCloseDialog}
          aria-labelledby="uw-login-title"
          open
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
      ) : null}
    </DialogCloseAnimation>
  );
}

LoginDialog.propTypes = {
  open: PropTypes.bool,
  show: PropTypes.string,
  fullScreen: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};

export default enhance(LoginDialog);
