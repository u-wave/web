import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import PromptDialog from '../../Dialogs/PromptDialog';

export default class RenamePlaylistButton extends React.Component {
  static propTypes = {
    onRename: React.PropTypes.func.isRequired,
    initialName: React.PropTypes.string
  };

  state = {
    renaming: false
  };

  closeDialog() {
    this.setState({ renaming: false });
  }

  handleOpen = () => {
    this.setState({ renaming: true });
  };

  handleClose = () => {
    this.closeDialog();
  };

  handleSubmit = name =>
    this.props.onRename(name)
      .then(this.closeDialog.bind(this));

  render() {
    return (
      <IconButton
        onClick={this.handleOpen}
        tooltip="Rename"
        tooltipPosition="top-center"
      >
        <EditIcon color="#555" hoverColor="#fff" />
        {this.state.renaming && (
          <PromptDialog
            title="Playlist Name"
            submitLabel="Rename"
            icon={<EditIcon color="#777" />}
            value={this.props.initialName}
            onSubmit={this.handleSubmit}
            onCancel={this.handleClose}
          />
        )}
      </IconButton>
    );
  }
}
