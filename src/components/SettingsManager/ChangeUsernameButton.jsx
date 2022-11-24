import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import IconButton from '@mui/material/IconButton';
import { mdiPencil } from '@mdi/js';
import SvgIcon from '../SvgIcon';
import PromptDialog from '../Dialogs/PromptDialog';

const { useState } = React;

function ChangeUsernameButton({ initialUsername, onChangeUsername }) {
  const { t } = useTranslator();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (name) => {
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

ChangeUsernameButton.propTypes = {
  onChangeUsername: PropTypes.func.isRequired,
  initialUsername: PropTypes.string,
};

export default ChangeUsernameButton;
