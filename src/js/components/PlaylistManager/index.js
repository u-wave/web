import cx from 'classnames';
import find from 'array-find';
import React from 'react';
import PlaylistStore from '../../stores/PlaylistStore';
import SearchStore from '../../stores/SearchStore';
import PlaylistMenu from './Menu';
import PlaylistHeader from './Header';
import PlaylistPanel from './Panel';

function getState() {
  return {
    playlists: PlaylistStore.getPlaylists(),
    activeMedia: PlaylistStore.getActiveMedia(),
    selectedMedia: PlaylistStore.getSelectedMedia(),

    searchSource: SearchStore.getSourceType()
  };
}

export default class PlaylistManager extends React.Component {
  static propTypes = {
    className: React.PropTypes.string
  };

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  state = getState();

  componentDidMount() {
    PlaylistStore.on('change', this.onChange);
    SearchStore.on('change', this.onChange);
  }

  componentWillUnmount() {
    PlaylistStore.removeListener('change', this.onChange);
    SearchStore.removeListener('change', this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    const { playlists, selectedMedia, searchSource } = this.state;
    const active = find(playlists, playlist => playlist.active);
    const selected = find(playlists, playlist => playlist.selected);
    return (
      <div className={cx('PlaylistManager', 'AppColumn', 'AppColumn--full', this.props.className)}>
        <PlaylistHeader
          className="PlaylistManager-header AppRow AppRow--top"
          selectedPlaylist={selected}
          searchSource={searchSource}
        />

        <div className="AppRow AppRow--middle">
          <PlaylistMenu
            className="PlaylistManager-menu"
            playlists={playlists}
            active={active}
            selected={selected}
          />

          <PlaylistPanel
            className="PlaylistManager-panel"
            playlist={selected}
            media={selectedMedia}
          />
        </div>
      </div>
    );
  }
}
