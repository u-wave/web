import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectedPlaylistSelector,
  filteredSelectedPlaylistItemsSelector,
  isSelectedPlaylistLoadingSelector,
  isFilteredSelector,
} from '../../selectors/playlistSelectors';
import { openPreviewMediaDialog } from '../../actions/DialogActionCreators';
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
} from '../../actions/PlaylistActionCreators';
import PlaylistPanel from '../components/PlaylistManager/PlaylistPanel';

const {
  useCallback,
  useMemo,
} = React;

const selectionOrOne = (media, selection) => {
  if (selection.isSelected(media)) {
    return selection.get();
  }
  return [media];
};

function PlaylistPanelContainer({ onCloseOverlay }) {
  const playlist = useSelector(selectedPlaylistSelector);
  const playlistItems = useSelector(filteredSelectedPlaylistItemsSelector);
  const loading = useSelector(isSelectedPlaylistLoadingSelector);
  const isFiltered = useSelector(isFilteredSelector);
  const dispatch = useDispatch();

  const onShufflePlaylist = useCallback(() => (
    dispatch(shufflePlaylist(playlist._id))
  ), [playlist._id]);
  const onActivatePlaylist = useCallback(() => (
    dispatch(activatePlaylist(playlist._id))
  ), [playlist._id]);
  const onRenamePlaylist = useCallback(() => (
    dispatch(renamePlaylist(playlist._id))
  ), [playlist._id]);
  const onDeletePlaylist = useCallback(() => (
    dispatch(deletePlaylist(playlist._id))
  ), [playlist._id]);
  const onNotDeletable = useCallback(() => (
    dispatch(cannotDeleteActivePlaylist())
  ), []);

  const onOpenAddMediaMenu = useCallback((position, media, selection) => (
    dispatch(addMediaMenu(selectionOrOne(media, selection), position))
  ), []);
  const onOpenPreviewMediaDialog = useCallback((media) => (
    dispatch(openPreviewMediaDialog(media))
  ), []);
  const onMoveToFirst = useCallback((media, selection) => (
    dispatch(moveMedia(playlist._id, selectionOrOne(media, selection), { at: 'start' }))
  ), [playlist._id]);
  const onMoveMedia = useCallback((media, opts) => (
    dispatch(moveMedia(playlist._id, media, opts))
  ), [playlist._id]);
  const onEditMedia = useCallback((media) => (
    dispatch(editMedia(playlist._id, media))
  ), [playlist._id]);
  const onRemoveFromPlaylist = useCallback((media, selection) => (
    dispatch(removeMedia(playlist._id, selectionOrOne(media, selection)))
  ), [playlist._id]);
  const onLoadPlaylistPage = useMemo(() => {
    if (isFiltered) {
      return (page) => dispatch(loadFilteredPlaylistItems(playlist._id, page));
    }
    return (page) => dispatch(loadPlaylist(playlist._id, page));
  }, [isFiltered, playlist._id]);
  const onFilterPlaylistItems = useCallback((filter) => (
    dispatch(filterPlaylistItems(playlist._id, filter))
  ), [playlist._id]);

  return (
    <PlaylistPanel
      playlist={playlist}
      media={playlistItems}
      loading={loading}
      isFiltered={isFiltered}
      onShufflePlaylist={onShufflePlaylist}
      onActivatePlaylist={onActivatePlaylist}
      onRenamePlaylist={onRenamePlaylist}
      onDeletePlaylist={onDeletePlaylist}
      onNotDeletable={onNotDeletable}
      onOpenAddMediaMenu={onOpenAddMediaMenu}
      onOpenPreviewMediaDialog={onOpenPreviewMediaDialog}
      onMoveToFirst={onMoveToFirst}
      onMoveMedia={onMoveMedia}
      onEditMedia={onEditMedia}
      onRemoveFromPlaylist={onRemoveFromPlaylist}
      onLoadPlaylistPage={onLoadPlaylistPage}
      onFilterPlaylistItems={onFilterPlaylistItems}
    />
  );
}

PlaylistPanelContainer.propTypes = {
  onCloseOverlay: PropTypes.func.isRequired,
};

export default PlaylistPanelContainer;
