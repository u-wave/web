import cx from 'classnames';
import * as React from 'react';
import CreatePlaylistIcon from 'material-ui/svg-icons/content/add';

import PromptDialog from '../../Dialogs/PromptDialog';

export default class NewPlaylist extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    onCreatePlaylist: React.PropTypes.func.isRequired
  };

  state = {
    creating: false
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
    const { className } = this.props;
    return (
      <button
        role="menuitem"
        className={cx('PlaylistMenuRow', 'PlaylistMenuRow--create', className)}
        onClick={this.handleOpen}
      >
        <div className="PlaylistMenuRow-title">
          <div className="PlaylistMenuRow-active-icon">
            <CreatePlaylistIcon color="#fff" />
          </div>
          Create Playlist
        </div>
        {this.state.creating && (
          <PromptDialog
            title="Playlist Name"
            icon={<CreatePlaylistIcon color="#777" />}
            submitLabel="Create"
            onSubmit={this.handleSubmit}
            onCancel={this.handleClose}
          />
        )}
      </button>
    );
  }
}
