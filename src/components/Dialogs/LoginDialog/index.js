import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogCloseAnimation from '../../DialogCloseAnimation';
import Button from '../../Form/Button';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import SocialForm from './SocialForm';
import ResetPasswordForm from './ResetPasswordForm';

const enhance = withMobileDialog();

function Loading({ onCancel }) {
  const { t } = useTranslator();

  return (
    <>
      <div className="LoginDialog-loading">
        <CircularProgress size={160} />
      </div>
      <Button onClick={onCancel}>
        {t(['login.social.cancelWaiting', 'dialogs.confirm.defaultCancelLabel'])}
      </Button>
    </>
  );
}

Loading.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

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
    const { service } = props;
    const serviceName = t(`login.social.services.${service}`);
    title = t('login.social.registerWithTitle', { service: serviceName });
    form = <SocialForm {...props} />;
  } else if (show === 'reset') {
    title = t('login.requestPasswordReset');
    form = <ResetPasswordForm {...props} />;
  } else if (show === 'loading') {
    const { service } = props;
    const serviceName = t(`login.social.services.${service}`);
    title = t('login.social.waitingForTitle', { service: serviceName });
    form = <Loading onCancel={onCloseDialog} />;
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
  service: PropTypes.string,
  fullScreen: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};

export default enhance(LoginDialog);
