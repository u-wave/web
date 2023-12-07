import React from 'react';
import { useSelector, useDispatch } from '../hooks/useRedux';
import {
  selectedPlaylistSelector,
  filteredSelectedPlaylistItemsSelector,
  isSelectedPlaylistLoadingSelector,
  playlistItemFilterSelector,
} from '../selectors/playlistSelectors';
import {
  filterPlaylistItems,
  cannotDeleteActivePlaylist,
  shufflePlaylist,
} from '../actions/PlaylistActionCreators';
import PlaylistPanel from '../components/PlaylistManager/Panel';
import {
  deletePlaylist,
  loadPlaylist,
  renamePlaylist,
  activatePlaylist,
  movePlaylistItems,
  type PlaylistItem,
  type InsertTarget,
} from '../reducers/playlists';

const { useCallback } = React;

function PlaylistPanelContainer() {
  const playlist = useSelector(selectedPlaylistSelector);
  const playlistItems = useSelector(filteredSelectedPlaylistItemsSelector)!;
  const loading = useSelector(isSelectedPlaylistLoadingSelector);
  const filter = useSelector(playlistItemFilterSelector);
  const dispatch = useDispatch();
  const playlistID = playlist._id;

  const onShufflePlaylist = useCallback(async () => {
    await dispatch(shufflePlaylist(playlistID));
  }, [dispatch, playlistID]);
  const onActivatePlaylist = useCallback(async () => {
    await dispatch(activatePlaylist(playlistID));
  }, [dispatch, playlistID]);
  const onRenamePlaylist = useCallback(async (name: string) => {
    await dispatch(renamePlaylist({ playlistID, name }));
  }, [dispatch, playlistID]);
  const onDeletePlaylist = useCallback(async () => {
    await dispatch(deletePlaylist(playlistID));
  }, [dispatch, playlistID]);
  const onNotDeletable = useCallback(() => {
    dispatch(cannotDeleteActivePlaylist(playlistID));
  }, [dispatch, playlistID]);

  const onMoveMedia = useCallback(async (media: PlaylistItem[], opts: InsertTarget) => {
    await dispatch(movePlaylistItems({
      playlistID,
      medias: media,
      target: opts,
    }));
  }, [dispatch, playlistID]);
  const onLoadPlaylistPage = useCallback(async (page: number) => {
    await dispatch(loadPlaylist({ playlistID, page, filter }));
  }, [dispatch, filter, playlistID]);
  const onFilterPlaylistItems = useCallback((newFilter: string | null) => {
    dispatch(filterPlaylistItems(playlistID, newFilter));
  }, [dispatch, playlistID]);

  return (
    <PlaylistPanel
      playlist={playlist}
      media={playlistItems}
      loading={loading}
      isFiltered={Boolean(filter)}
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
