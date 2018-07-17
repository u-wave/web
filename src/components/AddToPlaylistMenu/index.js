import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import CreatePlaylistIcon from '@material-ui/icons/Add';
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

  handleSubmit = (playlistName) => {
    const { onCreatePlaylist, onSelect, onClose } = this.props;

    return Promise.resolve(onCreatePlaylist(playlistName))
      .then(playlist => onSelect(playlist))
      .then(() => onClose());
  };

  render() {
    const { t, ...props } = this.props;
    const { creating } = this.state;

    return (
      <React.Fragment>
        {!creating && (
          <PlaylistsMenu
            {...props}
            onCreatePlaylist={this.handleOpen}
          />
        )}
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

export default enhance(AddToPlaylistMenu);
