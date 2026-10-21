import { useCallback } from 'react';
import PlaylistsMenu from '../components/PlaylistManager/Menu';
import { useDispatch, useSelector } from '../hooks/useRedux';
import {
  activatePlaylist,
  addPlaylistItems,
  createPlaylist,
  type NewPlaylistItem,
  type Playlist,
  playlistsSelector,
  selectActivePlaylist,
  selectedPlaylistIDSelector,
  selectPlaylist,
  showImportPanel,
  showSearchResults,
} from '../reducers/playlists';
import { useMediaSearchStore } from '../stores/MediaSearchStore';

type PlaylistMenuContainerProps = {
  className?: string,
};
function PlaylistsMenuContainer({ className }: PlaylistMenuContainerProps) {
  const playlists = useSelector(playlistsSelector);
  const selected = useSelector(selectedPlaylistIDSelector);
  const mediaSearch = useMediaSearchStore();
  const dispatch = useDispatch();

  const onAddToPlaylist = useCallback(
    async (playlist: Playlist, items: NewPlaylistItem[]) => {
      await dispatch(addPlaylistItems({ playlistID: playlist._id, items }));
    },
    [dispatch],
  );
  const onCreatePlaylist = useCallback(async (name: string) => {
    await dispatch(createPlaylist(name));
  }, [dispatch]);
  const onSelectPlaylist = useCallback((id: string) => {
    dispatch(selectPlaylist(id));
  }, [dispatch]);
  const onSelectSearchResults = useCallback(() => {
    dispatch(showSearchResults());
  }, [dispatch]);
  const resetSearch = mediaSearch.reset;
  const onCloseSearchResults = useCallback(() => {
    resetSearch();
    dispatch(selectActivePlaylist());
  }, [resetSearch, dispatch]);
  const onShowImportPanel = useCallback(() => {
    dispatch(showImportPanel());
  }, [dispatch]);
  const onActivatePlaylist = useCallback((id: string) => {
    dispatch(activatePlaylist(id));
  }, [dispatch]);

  return (
    <PlaylistsMenu
      className={className}
      playlists={playlists}
      selected={selected}
      searchQuery={mediaSearch.query}
      onAddToPlaylist={onAddToPlaylist}
      onCreatePlaylist={onCreatePlaylist}
      onSelectPlaylist={onSelectPlaylist}
      onSelectSearchResults={onSelectSearchResults}
      onCloseSearchResults={onCloseSearchResults}
      onShowImportPanel={onShowImportPanel}
      onActivatePlaylist={onActivatePlaylist}
    />
  );
}

export default PlaylistsMenuContainer;
