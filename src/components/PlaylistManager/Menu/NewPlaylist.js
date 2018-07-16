import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import MenuItem from '@material-ui/core/MenuItem';
import CreatePlaylistIcon from '@material-ui/icons/Add';

import PromptDialog from '../../Dialogs/PromptDialog';

const enhance = translate();

class NewPlaylist extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    t: PropTypes.func.isRequired,
    onCreatePlaylist: PropTypes.func.isRequired,
  };

  state = {
    creating: false,
  };

  handleOpen = () => {
    this.setState({ creating: true });
  };

  handleClose = () => {
    this.closeDialog();
  };

  handleSubmit = (playlistName) => {
    const { onCreatePlaylist } = this.props;

    return Promise.resolve(onCreatePlaylist(playlistName))
      .then(this.closeDialog.bind(this));
  };

  closeDialog() {
    this.setState({ creating: false });
  }

  render() {
    const { t, className } = this.props;
    const { creating } = this.state;

    return (
      <React.Fragment>
        <MenuItem
          className={cx('PlaylistMenuRow', 'PlaylistMenuRow--create', className)}
          onClick={this.handleOpen}
        >
          <div className="PlaylistMenuRow-title">
            <div className="PlaylistMenuRow-active-icon">
              <CreatePlaylistIcon />
            </div>
            {t('playlists.new')}
          </div>
        </MenuItem>
        {creating && (
          <PromptDialog
            title={t('dialogs.createPlaylist.nameInputTitle')}
            icon={<CreatePlaylistIcon nativeColor="#777" />}
            submitLabel={t('dialogs.createPlaylist.action')}
            onSubmit={this.handleSubmit}
            onCancel={this.handleClose}
          />
        )}
      </React.Fragment>
    );
  }
}

export default enhance(NewPlaylist);
