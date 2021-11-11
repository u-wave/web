import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectedPlaylistSelector,
  filteredSelectedPlaylistItemsSelector,
  isSelectedPlaylistLoadingSelector,
  isFilteredSelector,
} from '../selectors/playlistSelectors';
import {
  moveMedia,
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

const { useCallback } = React;

function PlaylistPanelContainer() {
  const playlist = useSelector(selectedPlaylistSelector);
  const playlistItems = useSelector(filteredSelectedPlaylistItemsSelector);
  const loading = useSelector(isSelectedPlaylistLoadingSelector);
  const isFiltered = useSelector(isFilteredSelector);
  const dispatch = useDispatch();

  const onShufflePlaylist = useCallback(
    () => dispatch(shufflePlaylist(playlist._id)),
    [dispatch, playlist],
  );
  const onActivatePlaylist = useCallback(
    () => dispatch(activatePlaylist(playlist._id)),
    [dispatch, playlist],
  );
  const onRenamePlaylist = useCallback(
    (name) => dispatch(renamePlaylist(playlist._id, name)),
    [dispatch, playlist],
  );
  const onDeletePlaylist = useCallback(
    () => dispatch(deletePlaylist(playlist._id)),
    [dispatch, playlist],
  );
  const onNotDeletable = useCallback(
    () => dispatch(cannotDeleteActivePlaylist(playlist._id)),
    [dispatch, playlist],
  );

  const onMoveMedia = useCallback(
    (media, opts) => dispatch(moveMedia(playlist._id, media, opts)),
    [dispatch, playlist],
  );
  const onLoadPlaylistPage = useCallback((page) => {
    if (isFiltered) {
      return dispatch(loadFilteredPlaylistItems(playlist._id, page));
    }
    return dispatch(loadPlaylist(playlist._id, page));
  }, [dispatch, isFiltered, playlist]);
  const onFilterPlaylistItems = useCallback(
    (filter) => dispatch(filterPlaylistItems(playlist._id, filter)),
    [dispatch, playlist],
  );

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
      onMoveMedia={onMoveMedia}
      onLoadPlaylistPage={onLoadPlaylistPage}
      onFilterPlaylistItems={onFilterPlaylistItems}
    />
  );
}

export default PlaylistPanelContainer;
