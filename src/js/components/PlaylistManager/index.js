import cx from 'classnames';
import find from 'array-find';
import React from 'react';
import PlaylistStore from '../../stores/PlaylistStore';
import SearchStore from '../../stores/SearchStore';
import listen from '../../utils/listen';
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

@listen(PlaylistStore, SearchStore)
export default class PlaylistManager extends React.Component {
  static propTypes = {
    className: React.PropTypes.string
  };

  state = getState();

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
