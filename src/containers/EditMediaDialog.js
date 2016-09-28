/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TransitionGroup from 'react-addons-css-transition-group';
import { updateMedia } from '../actions/PlaylistActionCreators';
import { closeEditMediaDialog } from '../actions/DialogActionCreators';

import { editMediaDialogSelector } from '../selectors/dialogSelectors';
import EditMediaDialog from '../components/Dialogs/EditMediaDialog';

const mapDispatchToProps = dispatch => bindActionCreators({
  onUpdateMedia: updateMedia,
  onCloseDialog: closeEditMediaDialog
}, dispatch);

const DIALOG_ANIMATION_DURATION = 450; // ms

@connect(editMediaDialogSelector, mapDispatchToProps)
export default class EditMediaDialogContainer extends React.Component {
  static propTypes = {
    playlistID: React.PropTypes.string,
    media: React.PropTypes.object,
    onUpdateMedia: React.PropTypes.func.isRequired
  };

  render() {
    const { onUpdateMedia, playlistID, media, ...props } = this.props;
    return (
      <TransitionGroup
        transitionName="Dialog"
        transitionEnterTimeout={DIALOG_ANIMATION_DURATION}
        transitionLeaveTimeout={DIALOG_ANIMATION_DURATION}
      >
        {media && (
          <EditMediaDialog
            {...props}
            media={media}
            onEditedMedia={update => onUpdateMedia(playlistID, media._id, update)}
          />
        )}
      </TransitionGroup>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
