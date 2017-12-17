import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateMedia } from '../actions/PlaylistActionCreators';
import { closeEditMediaDialog } from '../actions/DialogActionCreators';
import { editMediaDialogSelector } from '../selectors/dialogSelectors';
import EditMediaDialog from '../components/Dialogs/EditMediaDialog';
import DialogCloseAnimation from '../components/DialogCloseAnimation';

const mapDispatchToProps = dispatch => bindActionCreators({
  onUpdateMedia: updateMedia,
  onCloseDialog: closeEditMediaDialog
}, dispatch);

const DIALOG_ANIMATION_DURATION = 450; // ms

const enhance = connect(editMediaDialogSelector, mapDispatchToProps);

const EditMediaDialogContainer = ({
  onUpdateMedia,
  playlistID,
  media,
  ...props
}) => (
  <DialogCloseAnimation delay={DIALOG_ANIMATION_DURATION}>
    {media && (
      <EditMediaDialog
        {...props}
        media={media}
        onEditedMedia={update => onUpdateMedia(playlistID, media._id, update)}
      />
    )}
  </DialogCloseAnimation>
);

EditMediaDialogContainer.propTypes = {
  playlistID: PropTypes.string,
  media: PropTypes.object,
  onUpdateMedia: PropTypes.func.isRequired
};

export default enhance(EditMediaDialogContainer);
