import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CreatePlaylistIcon from '@material-ui/icons/Add';
import ActiveIcon from '@material-ui/icons/Check';

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

  handleSelect = (e, playlistID) => {
    this.props.onClose();
    this.props.onSelect(this.props.playlists.find(pl => pl._id === playlistID));
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
              onClick={event => this.handleSelect(event, playlist._id)}
            >
              {!!playlist.active && (
                <ListItemIcon>
                  <ActiveIcon />
                </ListItemIcon>
              )}
              <ListItemText disableTypography className="AddToPlaylistMenu-playlistName">
                <Typography noWrap variant="subheading">{playlist.name}</Typography>
              </ListItemText>
              <ListItemText className="AddToPlaylistMenu-smallIcon" primary={String(playlist.size || 0)} />
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    );
  }
}

export default enhance(PlaylistsMenu);
