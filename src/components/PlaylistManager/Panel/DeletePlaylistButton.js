import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

import ConfirmDialog from '../../Dialogs/ConfirmDialog';
import FormGroup from '../../Form/Group';

const enhance = translate();

class DeletePlaylistButton extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onNotDeletable: PropTypes.func.isRequired,
    active: PropTypes.bool,
  };

  state = {
    deleting: false,
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
    const { t, active } = this.props;
    return (
      <React.Fragment>
        <Tooltip title={active ? t('playlists.deleteActive') : t('playlists.delete')} placement="top">
          <IconButton
            disabled={active}
            className="PlaylistMeta-iconButton"
            onClick={this.handleOpen}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        {this.state.deleting && (
          <ConfirmDialog
            title={t('dialogs.deletePlaylist.title')}
            confirmLabel={t('dialogs.deletePlaylist.action')}
            onConfirm={this.handleConfirm}
            onCancel={this.handleClose}
          >
            <FormGroup>{t('dialogs.deletePlaylist.confirm')}</FormGroup>
          </ConfirmDialog>
        )}
      </React.Fragment>
    );
  }
}

export default enhance(DeletePlaylistButton);
