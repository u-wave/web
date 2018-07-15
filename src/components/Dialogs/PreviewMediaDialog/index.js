import React from 'react';
import PropTypes from 'prop-types';
import withProps from 'recompose/withProps';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogCloseAnimation from '../../DialogCloseAnimation';
import PreviewPlayer from '../../Video/Player';

function getTitle(media) {
  return `${media.artist} – ${media.title}`;
}

const PreviewDialogWrapper = withProps({
  disableEnforceFocus: true,
  maxWidth: false,
  classes: {
    root: 'AppColumn AppColumn--left',
    paper: 'Dialog PreviewMediaDialog',
  },
  BackdropProps: {
    className: 'AppColumn AppColumn--full',
  },
})(Dialog);

const PreviewMediaDialog = ({
  open,
  media,
  volume,
  onCloseDialog,
}) => (
  <DialogCloseAnimation delay={450}>
    {open ? (
      <PreviewDialogWrapper
        onClose={onCloseDialog}
        aria-label={getTitle(media)}
        open
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
      </PreviewDialogWrapper>
    ) : null}
  </DialogCloseAnimation>
);

PreviewMediaDialog.propTypes = {
  open: PropTypes.bool,
  media: PropTypes.object,
  volume: PropTypes.number,

  onCloseDialog: PropTypes.func.isRequired,
};

export default PreviewMediaDialog;
