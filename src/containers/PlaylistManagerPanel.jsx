import React from 'react';
import { useSelector, useDispatch } from '../hooks/useRedux';
import {
  selectedPlaylistSelector,
  filteredSelectedPlaylistItemsSelector,
  isSelectedPlaylistLoadingSelector,
  isFilteredSelector,
} from '../selectors/playlistSelectors';
import {
  filterPlaylistItems,
  renamePlaylist,
  deletePlaylist,
  cannotDeleteActivePlaylist,
  shufflePlaylist,
  loadPlaylist,
  loadFilteredPlaylistItems,
} from '../actions/PlaylistActionCreators';
import PlaylistPanel from '../components/PlaylistManager/Panel';
import { activatePlaylist, movePlaylistItems } from '../reducers/playlists';

const { useCallback } = React;

function PlaylistPanelContainer() {
  const playlist = useSelector(selectedPlaylistSelector);
  const playlistItems = useSelector(filteredSelectedPlaylistItemsSelector);
  const loading = useSelector(isSelectedPlaylistLoadingSelector);
  const isFiltered = useSelector(isFilteredSelector);
  const dispatch = useDispatch();
  const playlistID = playlist._id;

  const onShufflePlaylist = useCallback(
    () => dispatch(shufflePlaylist(playlistID)),
    [dispatch, playlistID],
  );
  const onActivatePlaylist = useCallback(
    () => dispatch(activatePlaylist(playlistID)),
    [dispatch, playlistID],
  );
  const onRenamePlaylist = useCallback(
    (name) => dispatch(renamePlaylist(playlistID, name)),
    [dispatch, playlistID],
  );
  const onDeletePlaylist = useCallback(
    () => dispatch(deletePlaylist(playlistID)),
    [dispatch, playlistID],
  );
  const onNotDeletable = useCallback(
    () => dispatch(cannotDeleteActivePlaylist(playlistID)),
    [dispatch, playlistID],
  );

  const onMoveMedia = useCallback(
    (media, opts) => dispatch(movePlaylistItems({
      playlistID,
      medias: media,
      target: opts,
    })),
    [dispatch, playlistID],
  );
  const onLoadPlaylistPage = useCallback((page) => {
    if (isFiltered) {
      return dispatch(loadFilteredPlaylistItems(playlistID, page));
    }
    return dispatch(loadPlaylist(playlistID, page));
  }, [dispatch, isFiltered, playlistID]);
  const onFilterPlaylistItems = useCallback(
    (filter) => dispatch(filterPlaylistItems(playlistID, filter)),
    [dispatch, playlistID],
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
