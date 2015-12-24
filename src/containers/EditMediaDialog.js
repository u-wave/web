import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateMedia } from '../actions/PlaylistActionCreators';
import { closeEditMediaDialog} from '../actions/DialogActionCreators';

import EditMediaDialog from '../components/Dialogs/EditMediaDialog';

const mapStateToProps = ({ dialogs }) => ({
  ...dialogs.editMedia.payload,
  open: dialogs.editMedia.open
});
const mapDispatchToProps = dispatch => bindActionCreators({
  onUpdateMedia: updateMedia,
  onCloseDialog: closeEditMediaDialog
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
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
