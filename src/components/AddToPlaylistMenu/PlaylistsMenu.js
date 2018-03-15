import find from 'array-find';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import CreatePlaylistIcon from 'material-ui/svg-icons/content/add';
// 😱
import RenderToLayer from 'material-ui/internal/RenderToLayer';

const MENU_HEIGHT = 320;
const MENU_WIDTH = 280;

const RANDOM_MUI_PADDING = 8;
const SCROLLBAR_WIDTH = 7;

const NEW_PLAYLIST = {};

const positionInsideWindow = (position, expectedHeight) => {
  const constrained = { x: position.x, y: position.y };
  const h = Math.min(expectedHeight, MENU_HEIGHT);
  const w = MENU_WIDTH;
  if (position.y + h >= window.innerHeight) {
    // position at the bottom of the screen
    constrained.y = window.innerHeight - h;
  }
  if (position.x + w >= window.innerWidth) {
    // position to the left-hand side of the anchor, instead of the right-hand side
    constrained.x -= w;
  }
  return constrained;
};

const menuStyle = {
  textAlign: 'left',
  zIndex: 30,
};
const menuItemStyle = {
  WebkitAppearance: 'initial',
};

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
    if (playlistID === NEW_PLAYLIST) {
      this.props.onCreatePlaylist();
      return;
    }
    this.props.onClose();
    this.props.onSelect(find(this.props.playlists, pl => pl._id === playlistID));
  };

  renderLayer = () => {
    const { playlists, position, t } = this.props;
    const fixedPosition = positionInsideWindow(position, (playlists.length + 1) * 48);
    return (
      <div
        style={{
          position: 'absolute',
          left: fixedPosition.x,
          top: fixedPosition.y,
          width: MENU_WIDTH + RANDOM_MUI_PADDING + SCROLLBAR_WIDTH,
        }}
      >
        <Paper>
          <Menu
            style={menuStyle}
            maxHeight={MENU_HEIGHT}
            width={MENU_WIDTH}
            autoWidth={false}
            onItemClick={this.handleSelect}
          >
            <MenuItem
              style={menuItemStyle}
              value={NEW_PLAYLIST}
              leftIcon={<CreatePlaylistIcon color="#fff" />}
              primaryText={t('playlists.new')}
            />
            {playlists.map(playlist => (
              <MenuItem
                key={playlist._id}
                style={menuItemStyle}
                value={playlist._id}
                primaryText={playlist.name}
                secondaryText={`${playlist.size || 0}`}
                checked={!!playlist.active}
              />
            ))}
          </Menu>
        </Paper>
      </div>
    );
  };

  render() {
    const { onClose } = this.props;
    return (
      <RenderToLayer
        open
        componentClickAway={onClose}
        render={this.renderLayer}
      />
    );
  }
}

export default enhance(PlaylistsMenu);
