import * as React from 'react';
import CreatePlaylistIcon from 'material-ui/svg-icons/content/add';

import PromptDialog from '../Dialogs/PromptDialog';
import PlaylistsMenu from './PlaylistsMenu';

export default class AddToPlaylistMenu extends React.Component {
  static propTypes = {
    onClose: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    onCreatePlaylist: React.PropTypes.func.isRequired
  };

  state = {
    creating: false
  };

  handleOpen = () => {
    this.setState({ creating: true });
  };

  handleClose = () => {
    this.setState({ creating: false });
  };

  handleSubmit = playlistName =>
    Promise.resolve(this.props.onCreatePlaylist(playlistName))
      .then(playlist => this.props.onSelect(playlist))
      .then(() => this.props.onClose());

  render() {
    return (
      <div>
        {!this.state.creating && (
          <PlaylistsMenu
            {...this.props}
            onCreatePlaylist={this.handleOpen}
          />
        )}
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
