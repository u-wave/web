import { useState } from 'react';
import { useTranslator } from '@u-wave/react-translate';
import IconButton from '@mui/material/IconButton';
import { mdiPencil } from '@mdi/js';
import SvgIcon from '../SvgIcon';
import PromptDialog from '../Dialogs/PromptDialog';

type ChangeUsernameButtonProps = {
  initialUsername: string,
  onChangeUsername: (username: string) => undefined | Promise<void>,
};
function ChangeUsernameButton({ initialUsername, onChangeUsername }: ChangeUsernameButtonProps) {
  const { t } = useTranslator();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (name: string) => {
    try {
      if (name === initialUsername) {
        return;
      }
      await onChangeUsername(name);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <>
      <IconButton className="ChangeUsernameButton" onClick={handleOpen}>
        <SvgIcon path={mdiPencil} className="ChangeUsernameButton-icon" />
      </IconButton>
      <PromptDialog
        open={isOpen}
        title={t('settings.profile.username.change')}
        submitLabel={t('settings.profile.username.save')}
        icon={<SvgIcon path={mdiPencil} />}
        defaultValue={initialUsername}
        onSubmit={handleSubmit}
        onCancel={handleClose}
      />
    </>
  );
}

export default ChangeUsernameButton;
