import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';

import PreviewPlayer from '../../Video/Player';

const useClassNameWidthStyle = {
  width: null,
};
const inheritWidthStyle = {
  width: 'inherit',
};

const PreviewMediaDialog = ({
  open,
  media,
  volume,
  onCloseDialog,
}) => (
  <Dialog
    className="AppColumn AppColumn--left"
    style={useClassNameWidthStyle}
    overlayStyle={inheritWidthStyle}
    contentClassName="Dialog PreviewMediaDialog"
    bodyClassName="Dialog-body"
    titleClassName="Dialog-title"
    title={open ? `${media.artist} – ${media.title}` : 'Preview Media'}
    open={open}
    onRequestClose={onCloseDialog}
    autoScrollBodyContent
  >
    {open && (
      <div className="PreviewMediaDialog-content">
        <PreviewPlayer
          mode="preview"
          media={media}
          volume={volume}
        />
      </div>
    )}
  </Dialog>
);

PreviewMediaDialog.propTypes = {
  open: PropTypes.bool,
  media: PropTypes.object,
  volume: PropTypes.number,

  onCloseDialog: PropTypes.func.isRequired,
};

export default PreviewMediaDialog;
