import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import ConfirmDialog from '../../Dialogs/ConfirmDialog';
import FormGroup from '../../Form/Group';

export default class DeletePlaylistButton extends React.Component {
  static propTypes = {
    onDelete: React.PropTypes.func.isRequired,
    onNotDeletable: React.PropTypes.func.isRequired,
    active: React.PropTypes.bool
  };

  state = {
    deleting: false
  };

  closeDialog() {
    this.setState({ deleting: false });
  }

  handleOpen = () => {
    if (this.props.active) {
      this.props.onNotDeletable();
    } else {
      this.setState({ deleting: true });
    }
  };

  handleClose = () => {
    this.closeDialog();
  };

  handleConfirm = name =>
    this.props.onDelete(name)
      .then(this.closeDialog.bind(this));

  render() {
    const hoverColor = this.props.active ? '#555' : '#fff';
    return (
      <IconButton
        onClick={this.handleOpen}
        tooltip="Delete"
        tooltipPosition="top-center"
      >
        <DeleteIcon color="#555" hoverColor={hoverColor} />
        {this.state.deleting && (
          <ConfirmDialog
            title="Delete Playlist"
            confirmLabel="Delete"
            onConfirm={this.handleConfirm}
            onCancel={this.handleClose}
          >
            <FormGroup>Are you sure you want to delete this playlist?</FormGroup>
          </ConfirmDialog>
        )}
      </IconButton>
    );
  }
}
