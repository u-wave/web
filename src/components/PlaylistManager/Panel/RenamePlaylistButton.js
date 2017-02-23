import * as React from 'react';
import { translate } from 'react-i18next';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import PromptDialog from '../../Dialogs/PromptDialog';

class RenamePlaylistButton extends React.Component {
  static propTypes = {
    t: React.PropTypes.func.isRequired,
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
    const { t } = this.props;
    return (
      <IconButton
        onClick={this.handleOpen}
        tooltip={t('playlists.rename')}
        tooltipPosition="top-center"
      >
        <EditIcon color="#555" hoverColor="#fff" />
        {this.state.renaming && (
          <PromptDialog
            title={t('dialogs.renamePlaylist.nameInputTitle')}
            submitLabel={t('dialogs.renamePlaylist.action')}
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

export default translate()(RenamePlaylistButton);
