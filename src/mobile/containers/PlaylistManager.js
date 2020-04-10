import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectedPlaylistSelector,
  filteredSelectedPlaylistItemsSelector,
} from '../../selectors/playlistSelectors';
import { showSearchResultsSelector } from '../../selectors/searchSelectors';
import { showImportPanelSelector } from '../../selectors/importSelectors';
import createLazyOverlay from '../../components/LazyOverlay';

const PlaylistManager = createLazyOverlay({
  loader: () => import('../components/PlaylistManager' /* webpackChunkName: "playlistsMobile" */),
  title: (t) => t('playlists.title'),
});

function PlaylistManagerContainer() {
  const selectedPlaylist = useSelector(selectedPlaylistSelector);
  const selectedItems = useSelector(filteredSelectedPlaylistItemsSelector);
  const showImportPanel = useSelector(showImportPanelSelector);
  const showSearchResults = useSelector(showSearchResultsSelector);

  return (
    <PlaylistManager
      selectedPlaylist={selectedPlaylist}
      selectedItems={selectedItems}
      showImportPanel={showImportPanel}
      showSearchResults={showSearchResults}
    />
  );
}

export default PlaylistManagerContainer;
