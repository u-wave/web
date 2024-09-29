import { useTranslator } from '@u-wave/react-translate';
import Button from '@mui/material/Button';
import { useDispatch } from '../../hooks/useRedux';
import { openLoginDialog } from '../../reducers/dialogs';

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'stretch',
  height: '100%',
};

const buttonStyle: React.CSSProperties = {
  height: '100%',
  fontSize: '11pt',
  textTransform: 'uppercase',
  width: '50%',
};

function LoginButtons() {
  const { t } = useTranslator();
  const dispatch = useDispatch();
  const onLogin = () => dispatch(openLoginDialog({ show: 'login' }));
  const onRegister = () => dispatch(openLoginDialog({ show: 'register' }));

  return (
    <span style={wrapperStyle}>
      <Button
        variant="contained"
        onClick={onLogin}
        style={buttonStyle}
      >
        {t('login.login')}
      </Button>
      <Button
        variant="text"
        color="secondary"
        onClick={onRegister}
        style={buttonStyle}
      >
        {t('login.register')}
      </Button>
    </span>
  );
}

export default LoginButtons;
