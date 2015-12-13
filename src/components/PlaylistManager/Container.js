import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import curry from 'curry';
import values from 'object-values';

import {
  editMedia,
  moveMedia,
  removeMedia,
  createPlaylist,
  activatePlaylist,
  selectPlaylist
} from '../../actions/PlaylistActionCreators';
import { search, setSource as setSearchSource } from '../../actions/SearchActionCreators';

import PlaylistManager from './';

const selectionOrOne = (media, selection) => {
  if (selection.isSelected(media)) {
    return selection.get();
  }
  return [ media ];
};

const mapStateToProps = ({ playlists, mediaSearch }) => ({
  playlists: values(playlists.playlists),
  activePlaylist: playlists.playlists[playlists.activePlaylistID],
  selectedPlaylist: playlists.playlists[playlists.selectedPlaylistID],
  activeMedia: playlists.activeMedia,
  selectedMedia: playlists.selectedMedia,

  searchSource: mediaSearch.sourceType,
  searchQuery: mediaSearch.query,
  searchResults: mediaSearch.results[mediaSearch.sourceType],
  searchLoadingState: mediaSearch.loadingState
});

const mapDispatchToProps = dispatch => {
  const onAddToPlaylist = () => {
    throw new Error('unimplemented');
  };
  const onRemoveFromPlaylist = (playlist, media, selection) =>
    removeMedia(playlist, selectionOrOne(media, selection));
  const onMoveToFirst = (playlist, media, selection) =>
    moveMedia(playlist, selectionOrOne(media, selection), -1);
  const onEditMedia = (playlist, media) =>
    editMedia(playlist, media);

  const bound = bindActionCreators({
    onAddToPlaylist,
    onMoveToFirst,
    onEditMedia,
    onRemoveFromPlaylist,
    onCreatePlaylist: createPlaylist,
    onActivatePlaylist: activatePlaylist,
    onSelectPlaylist: selectPlaylist,
    onSelectSearchResults: () => selectPlaylist(null),
    onSearchSubmit: search,
    onSearchSourceChange: setSearchSource
  }, dispatch);

  return {
    ...bound,
    onAddToPlaylist: bound.onAddToPlaylist,
    onMoveToFirst: curry.to(3, bound.onMoveToFirst),
    onEditMedia: curry.to(2, bound.onEditMedia),
    onRemoveFromPlaylist: curry.to(3, bound.onRemoveFromPlaylist)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class PlaylistManagerContainer extends Component {
  render() {
    return <PlaylistManager {...this.props} />;
  }
}
