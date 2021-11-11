import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@u-wave/react-translate';
import MenuItem from '@mui/material/MenuItem';
import CreatePlaylistIcon from '@mui/icons-material/Add';

import PromptDialog from '../../Dialogs/PromptDialog';

const enhance = translate();

class NewPlaylist extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    t: PropTypes.func.isRequired,
    onCreatePlaylist: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      creating: false,
    };
  }

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
      <>
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
            icon={<CreatePlaylistIcon htmlColor="#777" />}
            submitLabel={t('dialogs.createPlaylist.action')}
            onSubmit={this.handleSubmit}
            onCancel={this.handleClose}
          />
        )}
      </>
    );
  }
}

export default enhance(NewPlaylist);
