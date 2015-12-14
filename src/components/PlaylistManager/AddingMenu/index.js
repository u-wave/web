import find from 'array-find';
import React, { Component, PropTypes } from 'react';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RenderToLayer from 'material-ui/lib/render-to-layer';

export default class AddingMenu extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    playlists: PropTypes.arrayOf(PropTypes.object),
    media: PropTypes.arrayOf(PropTypes.object),
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    })
  };

  onSelect(e, item) {
    const playlistID = item.props.value;
    this.props.onClose();
    this.props.onSelect(
      find(this.props.playlists, pl => pl._id === playlistID),
      this.props.media
    );
  }

  renderLayer() {
    const { playlists, position } = this.props;
    return (
      <div style={{
        position: 'absolute',
        left: position.x,
        top: position.y
      }}>
        <Menu
          style={{ textAlign: 'left' }}
          onItemTouchTap={::this.onSelect}
        >
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
  }

  render() {
    const { onClose } = this.props;
    return (
      <RenderToLayer
        open
        componentClickAway={onClose}
        render={::this.renderLayer}
      />
    );
  }
}
