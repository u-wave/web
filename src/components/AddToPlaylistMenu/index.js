import find from 'array-find';
import React, { Component, PropTypes } from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
// 😱
import RenderToLayer from 'material-ui/internal/RenderToLayer';

const MENU_HEIGHT = 320;
const MENU_WIDTH = 280;

const RANDOM_MUI_PADDING = 8;
const SCROLLBAR_WIDTH = 7;

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
  zIndex: 30
};

export default class AddToPlaylistMenu extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    playlists: PropTypes.arrayOf(PropTypes.object),
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    })
  };

  handleSelect = (e, item) => {
    const playlistID = item.props.value;
    this.props.onClose();
    this.props.onSelect(
      find(this.props.playlists, pl => pl._id === playlistID)
    );
  };

  renderLayer = () => {
    const { playlists, position } = this.props;
    const fixedPosition = positionInsideWindow(position, (playlists.length + 1) * 48);
    return (
      <div
        style={{
          position: 'absolute',
          left: fixedPosition.x,
          top: fixedPosition.y,
          width: MENU_WIDTH + RANDOM_MUI_PADDING + SCROLLBAR_WIDTH
        }}
      >
        <Menu
          style={menuStyle}
          maxHeight={MENU_HEIGHT}
          width={MENU_WIDTH}
          autoWidth={false}
          onItemTouchTap={this.handleSelect}
        >
          <MenuItem
            primaryText="New Playlist"
          />
          {playlists.map(playlist => (
            <MenuItem
              key={playlist._id}
              value={playlist._id}
              primaryText={playlist.name}
              secondaryText={`${playlist.size || 0}`}
              checked={!!playlist.active}
            />
          ))}
        </Menu>
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
