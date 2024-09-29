import React from 'react';
import { useSelector } from '../../hooks/useRedux';
import createLazyOverlay from '../../components/LazyOverlay';
import {
  selectedPlaylistSelector,
  filteredSelectedPlaylistItemsSelector,
} from '../../reducers/playlists';

const PlaylistManager = createLazyOverlay({
  Component: React.lazy(() => import('../components/PlaylistManager')),
  title: (t) => t('playlists.title'),
});

type PlaylistManagerContainerProps = {
  onCloseOverlay: () => void,
};
function PlaylistManagerContainer({ onCloseOverlay }: PlaylistManagerContainerProps) {
  const selectedPlaylist = useSelector(selectedPlaylistSelector);
  const selectedItems = useSelector(filteredSelectedPlaylistItemsSelector);

  // This should not happen as you can only open the playlist manager
  // by selecting a playlist on mobile.
  if (!selectedPlaylist || !selectedItems) {
    return null;
  }

  return (
    <PlaylistManager
      selectedPlaylist={selectedPlaylist}
      selectedItems={selectedItems}
      onCloseOverlay={onCloseOverlay}
    />
  );
}

export default PlaylistManagerContainer;
