import React, { Component, PropTypes } from 'react';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class AddingMenu extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    playlists: PropTypes.arrayOf(PropTypes.object)
  };

  onSelect(e, item) {
    this.props.onSelect(item.props.value);
  }

  render() {
    const { playlists } = this.props;
    return (
      <Menu
        style={{ textAlign: 'left' }}
        onItemTouchTap={::this.onSelect}
      >
        {playlists.map(playlist => (
          <MenuItem
            key={playlist._id}
            value={playlist}
            primaryText={playlist.name}
            secondaryText={`${playlist.size}`}
            checked={!!playlist.active}
          />
        ))}
      </Menu>
    );
  }
}
