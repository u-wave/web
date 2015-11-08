import React from 'react';
import naturalCmp from 'natural-compare';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import PlaylistStore from '../../../stores/PlaylistStore';

const byName = (a, b) => naturalCmp(a.name.toLowerCase(), b.name.toLowerCase());

export default class AddingMenu extends React.Component {
  static propTypes = {
    onSelect: React.PropTypes.func.isRequired,
    playlists: React.PropTypes.arrayOf(React.PropTypes.object)
  };

  onSelect(e, item) {
    this.props.onSelect(item.props.value);
  }

  render() {
    let { playlists } = this.props;
    if (!playlists) {
      playlists = PlaylistStore.getPlaylists();
    }
    playlists = playlists.slice().sort(byName);
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
