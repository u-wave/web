import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import CreatePlaylistIcon from 'material-ui/svg-icons/content/add';
import PromptDialog from '../Dialogs/PromptDialog';
import PlaylistsMenu from './PlaylistsMenu';

const enhance = translate();

class AddToPlaylistMenu extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onCreatePlaylist: PropTypes.func.isRequired,
  };

  state = {
    creating: false,
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

export default enhance(AddToPlaylistMenu);
