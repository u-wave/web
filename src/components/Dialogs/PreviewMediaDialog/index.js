import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import PreviewPlayer from '../../Video/Player';

const TITLE = 'preview-media-title';

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
    aria-labelledby={TITLE}
  >
    <DialogTitle id={TITLE} className="Dialog-title">
      {open ? getTitle(media) : 'Preview Media'}
    </DialogTitle>
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
