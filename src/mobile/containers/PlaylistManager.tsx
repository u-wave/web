import React from 'react';
import { useDispatch, useSelector } from '../../hooks/useRedux';
import createLazyOverlay from '../../components/LazyOverlay';
import { closeOverlay } from '../../reducers/activeOverlay';
import {
  selectedPlaylistSelector,
  filteredSelectedPlaylistItemsSelector,
} from '../../reducers/playlists';

const {
  useCallback,
} = React;

const PlaylistManager = createLazyOverlay({
  Component: React.lazy(() => import('../components/PlaylistManager')),
  title: (t) => t('playlists.title'),
});

function PlaylistManagerContainer() {
  const selectedPlaylist = useSelector(selectedPlaylistSelector);
  const selectedItems = useSelector(filteredSelectedPlaylistItemsSelector);
  const dispatch = useDispatch();
  const onCloseOverlay = useCallback(() => dispatch(closeOverlay()), [dispatch]);

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
