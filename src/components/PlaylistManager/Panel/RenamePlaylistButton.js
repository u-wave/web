import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/ModeEdit';
import PromptDialog from '../../Dialogs/PromptDialog';

const enhance = translate();

class RenamePlaylistButton extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onRename: PropTypes.func.isRequired,
    initialName: PropTypes.string,
  };

  state = {
    renaming: false,
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
      <React.Fragment>
        <Tooltip title={t('playlists.rename')} placement="top">
          <IconButton className="PlaylistMeta-iconButton" onClick={this.handleOpen}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        {this.state.renaming && (
          <PromptDialog
            title={t('dialogs.renamePlaylist.nameInputTitle')}
            submitLabel={t('dialogs.renamePlaylist.action')}
            icon={<EditIcon nativeColor="#777" />}
            value={this.props.initialName}
            onSubmit={this.handleSubmit}
            onCancel={this.handleClose}
          />
        )}
      </React.Fragment>
    );
  }
}

export default enhance(RenamePlaylistButton);
