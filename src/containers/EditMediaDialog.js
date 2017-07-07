import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Transition from 'react-transition-group/Transition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { updateMedia } from '../actions/PlaylistActionCreators';
import { closeEditMediaDialog } from '../actions/DialogActionCreators';

import { editMediaDialogSelector } from '../selectors/dialogSelectors';
import EditMediaDialog from '../components/Dialogs/EditMediaDialog';

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
  <TransitionGroup>
    {media && (
      <Transition
        mountOnEnter
        unmountOnExit
        timeout={DIALOG_ANIMATION_DURATION}
      >
        <EditMediaDialog
          {...props}
          media={media}
          onEditedMedia={update => onUpdateMedia(playlistID, media._id, update)}
        />
      </Transition>
    )}
  </TransitionGroup>
);

EditMediaDialogContainer.propTypes = {
  playlistID: PropTypes.string,
  media: PropTypes.object,
  onUpdateMedia: PropTypes.func.isRequired
};

export default enhance(EditMediaDialogContainer);
