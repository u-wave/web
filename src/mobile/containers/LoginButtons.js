import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslator } from '@u-wave/react-translate';
import Button from '@material-ui/core/Button';
import { openLoginDialog, openRegisterDialog } from '../../actions/DialogActionCreators';

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'stretch',
  height: '100%',
};

const buttonStyle = {
  height: '100%',
  fontSize: '11pt',
  textTransform: 'uppercase',
  width: '50%',
};

function LoginButtons() {
  const { t } = useTranslator();
  const dispatch = useDispatch();
  const onLogin = () => dispatch(openLoginDialog());
  const onRegister = () => dispatch(openRegisterDialog());

  return (
    <span style={wrapperStyle}>
      <Button
        variant="contained"
        color="primary"
        onClick={onLogin}
        style={buttonStyle}
      >
        {t('login.login')}
      </Button>
      <Button
        onClick={onRegister}
        style={buttonStyle}
      >
        {t('login.register')}
      </Button>
    </span>
  );
}

export default LoginButtons;
