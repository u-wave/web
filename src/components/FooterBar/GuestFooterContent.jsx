import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslator } from '@u-wave/react-translate';
import Button from '@mui/material/Button';
import { openLoginDialog, openRegisterDialog } from '../../actions/DialogActionCreators';
import { toggleSettings } from '../../actions/OverlayActionCreators';
import SettingsButton from './SettingsButton';

const {
  useCallback,
} = React;

function GuestFooterContent() {
  const { t } = useTranslator();
  const dispatch = useDispatch();
  const handleToggleSettings = useCallback(() => {
    dispatch(toggleSettings());
  }, [dispatch]);
  const handleOpenLoginDialog = useCallback(() => {
    dispatch(openLoginDialog());
  }, [dispatch]);
  const handleOpenRegisterDialog = useCallback(() => {
    dispatch(openRegisterDialog());
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
