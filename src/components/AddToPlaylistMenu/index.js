import * as React from 'react';
import { translate } from 'react-i18next';
import CreatePlaylistIcon from 'material-ui/svg-icons/content/add';

import PromptDialog from '../Dialogs/PromptDialog';
import PlaylistsMenu from './PlaylistsMenu';

@translate()
export default class AddToPlaylistMenu extends React.Component {
  static propTypes = {
    t: React.PropTypes.func.isRequired,
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
    const { t, ...props } = this.props;
    return (
      <div>
        {!this.state.creating && (
          <PlaylistsMenu
            {...props}
            onCreatePlaylist={this.handleOpen}
          />
        )}
        {this.state.creating && (
          <PromptDialog
            title={t('dialogs.createPlaylist.nameInputTitle')}
            icon={<CreatePlaylistIcon color="#777" />}
            submitLabel={t('dialogs.createPlaylist.action')}
            onSubmit={this.handleSubmit}
            onCancel={this.handleClose}
          />
        )}
      </div>
    );
  }
}
