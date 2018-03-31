import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Tooltip from 'material-ui-next/Tooltip'; // eslint-disable-line
import IconButton from 'material-ui-next/IconButton'; // eslint-disable-line
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
      <Tooltip title={active ? t('playlists.deleteActive') : t('playlists.delete')} placement="top">
        <IconButton
          disabled={active}
          className="PlaylistMeta-iconButton"
          onClick={this.handleOpen}
        >
          <DeleteIcon />
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
        </IconButton>
      </Tooltip>
    );
  }
}

export default enhance(DeletePlaylistButton);
