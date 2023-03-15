import React from 'react';
import { useDispatch, useSelector } from '../../hooks/useRedux';
import {
  selectedPlaylistSelector,
  filteredSelectedPlaylistItemsSelector,
} from '../../selectors/playlistSelectors';
import { showSearchResultsSelector } from '../../selectors/searchSelectors';
import { showImportPanelSelector } from '../../selectors/importSelectors';
import createLazyOverlay from '../../components/LazyOverlay';
import { closeOverlay } from '../../reducers/activeOverlay';

const {
  useCallback,
} = React;

const PlaylistManager = createLazyOverlay({
  loader: () => import('../components/PlaylistManager'),
  title: (t) => t('playlists.title'),
});

function PlaylistManagerContainer() {
  const selectedPlaylist = useSelector(selectedPlaylistSelector);
  const selectedItems = useSelector(filteredSelectedPlaylistItemsSelector);
  const showImportPanel = useSelector(showImportPanelSelector);
  const showSearchResults = useSelector(showSearchResultsSelector);
  const dispatch = useDispatch();
  const onCloseOverlay = useCallback(() => dispatch(closeOverlay()), [dispatch]);

  return (
    <PlaylistManager
      selectedPlaylist={selectedPlaylist}
      selectedItems={selectedItems}
      showImportPanel={showImportPanel}
      showSearchResults={showSearchResults}
      onCloseOverlay={onCloseOverlay}
    />
  );
}

export default PlaylistManagerContainer;
