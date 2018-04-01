import find from 'array-find';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Popover from 'material-ui/Popover';
import { MenuList, MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import CreatePlaylistIcon from 'material-ui-icons/Add';
import ActiveIcon from 'material-ui-icons/Check';

const enhance = translate();

class PlaylistsMenu extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onCreatePlaylist: PropTypes.func.isRequired,
    playlists: PropTypes.arrayOf(PropTypes.object),
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  };

  handleSelect = (e, item) => {
    const playlistID = item.props.value;
    this.props.onClose();
    this.props.onSelect(find(this.props.playlists, pl => pl._id === playlistID));
  };

  render() {
    const {
      t,
      playlists,
      position,
      onClose,
      onCreatePlaylist,
    } = this.props;

    return (
      <Popover
        open
        anchorPosition={{ left: position.x, top: position.y }}
        anchorReference="anchorPosition"
        onClose={onClose}
      >
        <MenuList>
          <MenuItem onClick={onCreatePlaylist}>
            <ListItemText primary={t('playlists.new')} />
            <ListItemIcon><CreatePlaylistIcon /></ListItemIcon>
          </MenuItem>
          {playlists.map(playlist => (
            <MenuItem
              className="AddToPlaylistMenu-playlist"
              key={playlist._id}
              onClick={this.handleSelect}
            >
              {!!playlist.active && (
                <ListItemIcon>
                  <ActiveIcon />
                </ListItemIcon>
              )}
              <ListItemText primary={playlist.name} />
              <ListItemText className="AddToPlaylistMenu-smallIcon" primary={String(playlist.size || 0)} />
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    );
  }
}

export default enhance(PlaylistsMenu);
