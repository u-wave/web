import cx from 'clsx';
import { useId } from 'react';
import { useTranslator } from '@u-wave/react-translate';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { mdiClose } from '@mdi/js';
import { useTheme } from '@mui/material/styles';
import SvgIcon from '../../SvgIcon';
import LoginForm, { type LoginFormProps } from './LoginForm';
import RegisterForm, { type RegisterFormProps } from './RegisterForm';
import SocialForm, { type SocialFormProps } from './SocialForm';
import ResetPasswordForm, { type ResetPasswordFormProps } from './ResetPasswordForm';
import HeightTransition from './HeightTransition';

type LoginDialogProps = { open: boolean } & (
  RegisterFormProps | SocialFormProps | ResetPasswordFormProps | LoginFormProps
);
/* eslint-disable react/jsx-props-no-spreading */
function LoginDialog(props: LoginDialogProps) {
  const { t } = useTranslator();
  const titleId = useId();
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const {
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
    <Dialog
      classes={{
        paper: cx('Dialog', 'LoginDialog', isFullScreen && 'LoginDialog--mobile'),
      }}
      fullScreen={isFullScreen}
      onClose={onCloseDialog}
      aria-labelledby={titleId}
      open={open}
    >
      <DialogTitle className="Dialog-title" id={titleId}>
        {title}
        {isFullScreen && (
          <IconButton className="Dialog-close" onClick={onCloseDialog}>
            <SvgIcon path={mdiClose} />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent className="Dialog-body">
        <HeightTransition>
          {form}
        </HeightTransition>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
