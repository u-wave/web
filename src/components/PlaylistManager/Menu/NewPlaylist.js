import cx from 'classnames';
import * as React from 'react';
import CreatePlaylistIcon from 'material-ui/svg-icons/content/add';
import muiThemeable from 'material-ui/styles/muiThemeable';

import PromptDialog from '../../Dialogs/PromptDialog';

@muiThemeable()
export default class NewPlaylist extends React.Component {
  static propTypes = {
    muiTheme: React.PropTypes.object.isRequired,

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
    const {
      muiTheme,
      className
    } = this.props;

    return (
      <div
        role="menuitem"
        className={cx('PlaylistMenuRow', 'PlaylistMenuRow--create', className)}
        onClick={this.handleOpen}
      >
        <div className="PlaylistMenuRow-title">
          <div className="PlaylistMenuRow-active-icon">
            <CreatePlaylistIcon color={muiTheme.palette.textColor} />
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
      </div>
    );
  }
}
