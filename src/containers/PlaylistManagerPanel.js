import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import {
  selectedPlaylistSelector,
  filteredSelectedPlaylistItemsSelector,
  isSelectedPlaylistLoadingSelector,
  isFilteredSelector,
} from '../selectors/playlistSelectors';

import {
  openPreviewMediaDialog,
} from '../actions/DialogActionCreators';
import {
  addMediaMenu,
  editMedia,
  moveMedia,
  removeMedia,
  filterPlaylistItems,
  renamePlaylist,
  deletePlaylist,
  cannotDeleteActivePlaylist,
  shufflePlaylist,
  activatePlaylist,
  loadPlaylist,
  loadFilteredPlaylistItems,
} from '../actions/PlaylistActionCreators';

import PlaylistPanel from '../components/PlaylistManager/Panel';

const mapStateToProps = createStructuredSelector({
  playlist: selectedPlaylistSelector,
  media: filteredSelectedPlaylistItemsSelector,
  loading: isSelectedPlaylistLoadingSelector,
  isFiltered: isFilteredSelector,
});

const selectionOrOne = (media, selection) => {
  if (selection.isSelected(media)) {
    return selection.get();
  }
  return [media];
};

const onOpenAddMediaMenu = (position, media, selection) =>
  addMediaMenu(selectionOrOne(media, selection), position);
const onRemoveFromPlaylist = playlist => (media, selection) =>
  removeMedia(playlist, selectionOrOne(media, selection));
const onMoveMedia = playlist => (media, opts) =>
  moveMedia(playlist, media, opts);
const onMoveToFirst = playlist => (media, selection) =>
  moveMedia(playlist, selectionOrOne(media, selection), { at: 'start' });
const onMoveToLast = playlist => (media, selection) =>
  moveMedia(playlist, selectionOrOne(media, selection), { at: 'end' });
const onEditMedia = playlist => media =>
  editMedia(playlist, media);
const onLoadPlaylistPage = ({ isFiltered, playlist }) => page => (
  isFiltered ? loadFilteredPlaylistItems(playlist._id, page) :
    loadPlaylist(playlist._id, page)
);

// Most of the playlist-related action creators need to know which playlist to
// use, i.e. need to have a reference to the selected playlist. The selected
// playlist is picked out in `mapStateToProps`, but we can't access its result
// in `mapDispatchToProps` yet. Instead, `mapDispatchToProps` passes the
// `dispatch` function to the `mergeProps` function below, and then that
// configures the action creators.
// TODO Maybe it's better to have versions of these action creators that work on
// the selected playlist by default? using redux-thunk.
const mapDispatchToProps = dispatch => ({ dispatch });

const mergeProps = (state, { dispatch }, props) => ({
  ...props,
  ...state,
  ...bindActionCreators({
    onShufflePlaylist: shufflePlaylist.bind(null, state.playlist._id),
    onActivatePlaylist: activatePlaylist.bind(null, state.playlist._id),
    onRenamePlaylist: renamePlaylist.bind(null, state.playlist._id),
    onDeletePlaylist: deletePlaylist.bind(null, state.playlist._id),
    onNotDeletable: cannotDeleteActivePlaylist,

    onOpenAddMediaMenu,
    onOpenPreviewMediaDialog: openPreviewMediaDialog,
    onMoveToFirst: onMoveToFirst(state.playlist._id),
    onMoveToLast: onMoveToLast(state.playlist._id),
    onMoveMedia: onMoveMedia(state.playlist._id),
    onEditMedia: onEditMedia(state.playlist._id),
    onRemoveFromPlaylist: onRemoveFromPlaylist(state.playlist._id),
    onLoadPlaylistPage: onLoadPlaylistPage(state),
    onFilterPlaylistItems: filterPlaylistItems.bind(null, state.playlist._id),
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PlaylistPanel);
