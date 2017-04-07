import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import ConfirmDialog from '../../Dialogs/ConfirmDialog';
import FormGroup from '../../Form/Group';

class DeletePlaylistButton extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onNotDeletable: PropTypes.func.isRequired,
    active: PropTypes.bool
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
    const { t, active } = this.props;
    const hoverColor = active ? '#555' : '#fff';
    return (
      <IconButton
        onClick={this.handleOpen}
        tooltip={t('playlists.delete')}
        tooltipPosition="top-center"
      >
        <DeleteIcon color="#555" hoverColor={hoverColor} />
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
    );
  }
}

export default translate()(DeletePlaylistButton);
