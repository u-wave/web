import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import curry from 'curry';

import {
  addMedia,
  addMediaMenu,
  editMedia,
  moveMedia,
  removeMedia,
  createPlaylist,
  activatePlaylist,
  selectPlaylist,
  loadPlaylist
} from '../actions/PlaylistActionCreators';
import { search, setSource as setSearchSource } from '../actions/SearchActionCreators';

import { playlistsIndexSelector } from '../selectors/playlistSelectors';
import { searchSelector } from '../selectors/searchSelectors';
import PlaylistManager from '../components/PlaylistManager';

const mapStateToProps = createSelector(
  playlistsIndexSelector,
  searchSelector,
  (playlists, mediaSearch) => ({ ...playlists, ...mediaSearch })
);

const selectionOrOne = (media, selection) => {
  if (selection.isSelected(media)) {
    return selection.get();
  }
  return [ media ];
};

const mapDispatchToProps = dispatch => {
  const onOpenAddMediaMenu = (position, media, selection) =>
    addMediaMenu(selectionOrOne(media, selection), position);
  const onRemoveFromPlaylist = (playlist, media, selection) =>
    removeMedia(playlist, selectionOrOne(media, selection));
  const onMoveToFirst = (playlist, media, selection) =>
    moveMedia(playlist, selectionOrOne(media, selection), -1);
  const onEditMedia = (playlist, media) =>
    editMedia(playlist, media);

  const bound = bindActionCreators({
    onOpenAddMediaMenu,
    onMoveToFirst,
    onEditMedia,
    onRemoveFromPlaylist,
    onAddToPlaylist: addMedia,
    onCreatePlaylist: createPlaylist,
    onActivatePlaylist: activatePlaylist,
    onSelectPlaylist: selectPlaylist,
    onSelectSearchResults: () => selectPlaylist(null),
    onLoadPlaylistPage: loadPlaylist,
    onSearchSubmit: search,
    onSearchSourceChange: setSearchSource
  }, dispatch);

  return {
    ...bound,
    onOpenAddMediaMenu: curry.to(3, bound.onOpenAddMediaMenu),
    onMoveToFirst: curry.to(3, bound.onMoveToFirst),
    onEditMedia: curry.to(2, bound.onEditMedia),
    onLoadPlaylistPage: curry.to(2, bound.onLoadPlaylistPage),
    onRemoveFromPlaylist: curry.to(3, bound.onRemoveFromPlaylist)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class PlaylistManagerContainer extends Component {
  render() {
    return <PlaylistManager {...this.props} />;
  }
}
