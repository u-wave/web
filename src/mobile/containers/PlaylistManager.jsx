import React from 'react';
import { useDispatch, useSelector } from '../../hooks/useRedux';
import {
  selectedPlaylistSelector,
  filteredSelectedPlaylistItemsSelector,
  selectedPlaylistIDSelector,
} from '../../selectors/playlistSelectors';
import createLazyOverlay from '../../components/LazyOverlay';
import { closeOverlay } from '../../reducers/activeOverlay';
import { importPanelSymbol, searchPanelSymbol } from '../../reducers/playlists';

const {
  useCallback,
} = React;

const PlaylistManager = createLazyOverlay({
  Component: React.lazy(() => import('../components/PlaylistManager')),
  title: (t) => t('playlists.title'),
});

function PlaylistManagerContainer() {
  const selectedPlaylistID = useSelector(selectedPlaylistIDSelector);
  const selectedPlaylist = useSelector(selectedPlaylistSelector);
  const selectedItems = useSelector(filteredSelectedPlaylistItemsSelector);
  const dispatch = useDispatch();
  const onCloseOverlay = useCallback(() => dispatch(closeOverlay()), [dispatch]);

  return (
    <PlaylistManager
      selectedPlaylist={selectedPlaylist}
      selectedItems={selectedItems}
      showImportPanel={selectedPlaylistID === importPanelSymbol}
      showSearchResults={selectedPlaylistID === searchPanelSymbol}
      onCloseOverlay={onCloseOverlay}
    />
  );
}

export default PlaylistManagerContainer;
