import React from 'react';
import PropTypes from 'prop-types';
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

const DIALOG_ANIMATION_DURATION = 450; // ms

const enhance = connect(editMediaDialogSelector, mapDispatchToProps);

class UnmountAfterCloseAnimation extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    delay: PropTypes.number.isRequired
  };

  state = {
    children: this.props.children
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.children) {
      clearTimeout(this.timeout);
      this.setState({
        children: nextProps.children
      });
    }
    if (this.state.children && !nextProps.children) {
      this.setState({
        children: React.cloneElement(this.props.children, {
          open: false
        })
      });

      this.timeout = setTimeout(() => {
        this.setState({
          children: null
        });
      }, this.props.delay);
    }
  }

  render() {
    return this.state.children || null;
  }
}

const EditMediaDialogContainer = ({
  onUpdateMedia,
  playlistID,
  media,
  ...props
}) => (
  <UnmountAfterCloseAnimation delay={DIALOG_ANIMATION_DURATION}>
    {media && (
      <EditMediaDialog
        {...props}
        media={media}
        onEditedMedia={update => onUpdateMedia(playlistID, media._id, update)}
      />
    )}
  </UnmountAfterCloseAnimation>
);

EditMediaDialogContainer.propTypes = {
  playlistID: PropTypes.string,
  media: PropTypes.object,
  onUpdateMedia: PropTypes.func.isRequired
};

export default enhance(EditMediaDialogContainer);
