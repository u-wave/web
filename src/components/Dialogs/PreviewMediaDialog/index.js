import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import PreviewPlayer from '../../Video/Player';

function getTitle(media) {
  return `${media.artist} – ${media.title}`;
}

const PreviewMediaDialog = ({
  open,
  media,
  volume,
  onCloseDialog,
}) => (
  <Dialog
    classes={{
      root: 'AppColumn AppColumn--left',
      paper: 'Dialog PreviewMediaDialog',
    }}
    BackdropProps={{
      className: 'AppColumn AppColumn--full',
    }}
    open={open}
    onClose={onCloseDialog}
    disableEnforceFocus
    maxWidth={false}
    aria-label={open ? getTitle(media) : null}
  >
    <DialogContent className="Dialog-body PreviewMediaDialog-content">
      {open && (
        <PreviewPlayer
          mode="preview"
          media={media}
          volume={volume}
        />
      )}
    </DialogContent>
  </Dialog>
);

PreviewMediaDialog.propTypes = {
  open: PropTypes.bool,
  media: PropTypes.object,
  volume: PropTypes.number,

  onCloseDialog: PropTypes.func.isRequired,
};

export default PreviewMediaDialog;
