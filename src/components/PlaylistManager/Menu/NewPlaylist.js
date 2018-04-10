import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
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

  closeDialog() {
    this.setState({ creating: false });
  }

  handleOpen = () => {
    this.setState({ creating: true });
  };

  handleClose = () => {
    this.closeDialog();
  };

  handleSubmit = playlistName =>
    Promise.resolve(this.props.onCreatePlaylist(playlistName))
      .then(this.closeDialog.bind(this));

  render() {
    const { t, className } = this.props;
    return (
      <React.Fragment>
        <button
          role="menuitem"
          className={cx('PlaylistMenuRow', 'PlaylistMenuRow--create', className)}
          onClick={this.handleOpen}
        >
          <div className="PlaylistMenuRow-content">
            <div className="PlaylistMenuRow-title">
              <div className="PlaylistMenuRow-active-icon">
                <CreatePlaylistIcon />
              </div>
              {t('playlists.new')}
            </div>
          </div>
        </button>
        {this.state.creating && (
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
