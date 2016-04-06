import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import {
  addMedia,
  addMediaMenu,
  editMedia,
  moveMedia,
  removeMedia,
  askCreatePlaylist,
  askRenamePlaylist,
  askDeletePlaylist,
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

const selectSearchResults = () => selectPlaylist(null);
const onOpenAddMediaMenu = (position, media, selection) =>
  addMediaMenu(selectionOrOne(media, selection), position);
const onRemoveFromPlaylist = (playlist, media, selection) =>
  removeMedia(playlist, selectionOrOne(media, selection));
const onMoveToFirst = (playlist, media, selection) =>
  moveMedia(playlist, selectionOrOne(media, selection), { at: 'start' });
const onEditMedia = (playlist, media) =>
  editMedia(playlist, media);

const onMoveMedia = (playlist, media, opts) =>
  moveMedia(playlist, media, opts);

const mapDispatchToProps = dispatch => bindActionCreators({
  onOpenAddMediaMenu,
  onMoveToFirst,
  onEditMedia,
  onMoveMedia,
  onRemoveFromPlaylist,
  onAddToPlaylist: addMedia,
  onCreatePlaylist: askCreatePlaylist,
  onRenamePlaylist: askRenamePlaylist,
  onDeletePlaylist: askDeletePlaylist,
  onActivatePlaylist: activatePlaylist,
  onSelectPlaylist: selectPlaylist,
  onSelectSearchResults: selectSearchResults,
  onLoadPlaylistPage: loadPlaylist,
  onSearchSubmit: search,
  onSearchSourceChange: setSearchSource
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class PlaylistManagerContainer extends Component {
  render() {
    return <PlaylistManager {...this.props} />;
  }
}
