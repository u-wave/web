/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateMedia } from '../actions/PlaylistActionCreators';
import { closeEditMediaDialog } from '../actions/DialogActionCreators';

import { editMediaDialogSelector } from '../selectors/dialogSelectors';
import EditMediaDialog from '../components/Dialogs/EditMediaDialog';

const mapDispatchToProps = dispatch => bindActionCreators({
  onUpdateMedia: updateMedia,
  onCloseDialog: closeEditMediaDialog
}, dispatch);

@connect(editMediaDialogSelector, mapDispatchToProps)
export default class EditMediaDialogContainer extends Component {
  static propTypes = {
    playlistID: PropTypes.string.isRequired,
    media: PropTypes.object.isRequired,
    onUpdateMedia: PropTypes.func.isRequired,
    onCloseDialog: PropTypes.func.isRequired
  };

  render() {
    const { onUpdateMedia, playlistID, media, ...props } = this.props;
    return (
      <EditMediaDialog
        {...props}
        media={media}
        onEditedMedia={update => onUpdateMedia(playlistID, media._id, update)}
      />
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
