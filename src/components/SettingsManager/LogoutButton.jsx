import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/PowerSettingsNew';
import ConfirmDialog from '../Dialogs/ConfirmDialog';
import FormGroup from '../Form/Group';

const { useState } = React;

function LogoutButton({ onLogout }) {
  const { t } = useTranslator();
  const [showDialog, setShowDialog] = useState(false);

  const handleOpen = () => {
    setShowDialog(true);
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleConfirm = async () => {
    await onLogout();
    setShowDialog(false);
  };

  return (
    <>
      <Button color="inherit" className="LogoutButton" onClick={handleOpen}>
        <LogoutIcon className="LogoutButton-icon" />
        {t('settings.logout')}
      </Button>
      <ConfirmDialog
        open={showDialog}
        title=""
        confirmLabel={t('dialogs.logout.action')}
        onConfirm={handleConfirm}
        onCancel={handleClose}
      >
        <FormGroup>{t('dialogs.logout.confirm')}</FormGroup>
      </ConfirmDialog>
    </>
  );
}

LogoutButton.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default LogoutButton;
