import { useState } from 'react';
import { useTranslator } from '@u-wave/react-translate';
import Button from '@mui/material/Button';
import { mdiPower } from '@mdi/js';
import SvgIcon from '../SvgIcon';
import ConfirmDialog from '../Dialogs/ConfirmDialog';
import FormGroup from '../Form/Group';

type LogoutButtonProps = {
  onLogout: () => undefined | Promise<void>,
};
function LogoutButton({ onLogout }: LogoutButtonProps) {
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
        <SvgIcon path={mdiPower} className="LogoutButton-icon" />
        {t('settings.logout')}
      </Button>
      <ConfirmDialog
        open={showDialog}
        confirmLabel={t('dialogs.logout.action')}
        onConfirm={handleConfirm}
        onCancel={handleClose}
      >
        <FormGroup>{t('dialogs.logout.confirm')}</FormGroup>
      </ConfirmDialog>
    </>
  );
}

export default LogoutButton;
