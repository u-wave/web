import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import { IDLE, LOADING, LOADED } from '../../constants/LoadingStates';
import { search } from '../../actions/SearchActionCreators';
import PlaylistMenu from './Menu';
import PlaylistHeader from './Header';
import PlaylistPanel from './Panel';
import PlaylistPanelEmpty from './Panel/Empty';
import SearchResults from './Panel/SearchResults';

export default class PlaylistManager extends Component {
  static propTypes = {
    className: PropTypes.string,

    playlists: PropTypes.array,
    activePlaylist: PropTypes.object,
    activeMedia: PropTypes.array,
    selectedPlaylist: PropTypes.object,
    selectedMedia: PropTypes.array,

    searchSource: PropTypes.oneOf([ 'youtube', 'soundcloud' ]),
    searchQuery: PropTypes.string,
    searchResults: PropTypes.object,
    searchLoadingState: PropTypes.oneOf([ IDLE, LOADING, LOADED ]),

    onCloseOverlay: PropTypes.func,
    onSelectPlaylist: PropTypes.func,
    onAddToPlaylist: PropTypes.func,
    onMoveToFirst: PropTypes.func,
    onEditMedia: PropTypes.func,
    onRemoveFromPlaylist: PropTypes.func
  };

  render() {
    const {
      playlists,
      activePlaylist,
      selectedPlaylist,
      selectedMedia,
      searchSource,
      searchQuery,
      searchResults,
      searchLoadingState,
      onCloseOverlay,
      onSelectPlaylist
    } = this.props;

    let panel;
    if (selectedPlaylist) {
      const { onAddToPlaylist, onMoveToFirst, onEditMedia, onRemoveFromPlaylist } = this.props;
      panel = (
        <PlaylistPanel
          className="PlaylistManager-panel"
          playlist={selectedPlaylist}
          media={selectedMedia}
          loading={!!selectedPlaylist.loading}
          onAddToPlaylist={onAddToPlaylist}
          onMoveToFirst={onMoveToFirst(selectedPlaylist._id)}
          onEditMedia={onEditMedia(selectedPlaylist._id)}
          onRemoveFromPlaylist={onRemoveFromPlaylist(selectedPlaylist._id)}
        />
      );
    } else if (searchQuery) {
      const { onAddToPlaylist } = this.props;
      panel = (
        <SearchResults
          className="PlaylistManager-panel"
          query={searchQuery}
          results={searchResults}
          loadingState={searchLoadingState}
          onAddToPlaylist={onAddToPlaylist}
        />
      );
    } else {
      panel = <PlaylistPanelEmpty />;
    }

    return (
      <div className={cx('PlaylistManager', 'AppColumn', 'AppColumn--full', this.props.className)}>
        <PlaylistHeader
          className="PlaylistManager-header AppRow AppRow--top"
          selectedPlaylist={selectedPlaylist}
          searchSource={searchSource}
          onSearchSubmit={search}
          onCloseOverlay={onCloseOverlay}
        />

        <div className="AppRow AppRow--middle">
          <PlaylistMenu
            className="PlaylistManager-menu"
            playlists={playlists}
            active={activePlaylist}
            selected={selectedPlaylist}
            searchQuery={searchQuery}
            searchResults={searchResults ? searchResults.length : 0}
            onSelectPlaylist={playlist => onSelectPlaylist(playlist._id)}
          />

          {panel}
        </div>
      </div>
    );
  }
}
