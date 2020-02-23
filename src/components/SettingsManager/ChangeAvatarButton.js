import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AvatarDialog from '../AvatarDialog';
import DialogCloseAnimation from '../DialogCloseAnimation';

const { useCallback, useState } = React;

function ChangeAvatarButton({ user, onChangeAvatar }) {
  const [isOpen, setChangeDialogOpen] = useState(false);

  const handleOpen = useCallback(() => setChangeDialogOpen(true), []);
  const handleClose = useCallback(() => setChangeDialogOpen(false), []);

  return (
    <>
      <IconButton className="ChangeAvatarButton" onClick={handleOpen}>
        <EditIcon className="ChangeAvatarButton-icon" />
      </IconButton>
      <DialogCloseAnimation delay={450}>
        {isOpen ? (
          <AvatarDialog
            open
            user={user}
            onChangeAvatar={onChangeAvatar}
            onClose={handleClose}
          />
        ) : null}
      </DialogCloseAnimation>
    </>
  );
}

ChangeAvatarButton.propTypes = {
  user: PropTypes.object.isRequired,
  onChangeAvatar: PropTypes.func.isRequired,
};

export default ChangeAvatarButton;
