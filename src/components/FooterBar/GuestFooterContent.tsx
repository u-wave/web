import Button from '@mui/material/Button';
import { useTranslator } from '@u-wave/react-translate';
import { useCallback } from 'react';
import { useDispatch } from '../../hooks/useRedux';
import { toggleOverlay } from '../../reducers/activeOverlay';
import { openLoginDialog } from '../../reducers/dialogs';
import SettingsButton from './SettingsButton';

function GuestFooterContent() {
  const { t } = useTranslator();
  const dispatch = useDispatch();
  const handleToggleSettings = useCallback(() => {
    dispatch(toggleOverlay('settings'));
  }, [dispatch]);
  const handleOpenLoginDialog = useCallback(() => {
    dispatch(openLoginDialog({ show: 'login' }));
  }, [dispatch]);
  const handleOpenRegisterDialog = useCallback(() => {
    dispatch(openLoginDialog({ show: 'register' }));
  }, [dispatch]);

  return (
    <>
      <SettingsButton onClick={handleToggleSettings} />
      <div className="FooterBar-guest">
        {t('login.message')}
      </div>
      <Button
        variant="contained"
        color="primary"
        className="FooterAuthButton FooterAuthButton--login"
        onClick={handleOpenLoginDialog}
      >
        {t('login.login')}
      </Button>
      <Button
        variant="contained"
        color="primary"
        className="FooterAuthButton FooterAuthButton--register"
        onClick={handleOpenRegisterDialog}
      >
        {t('login.register')}
      </Button>
    </>
  );
}

export default GuestFooterContent;
