import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslator } from '@u-wave/react-translate';
import { selectedPlaylistSelector } from '../selectors/playlistSelectors';
import { showSearchResultsSelector } from '../selectors/searchSelectors';
import { showImportPanelSelector } from '../selectors/importSelectors';
import { createPlaylist } from '../actions/PlaylistActionCreators';
import createLazyOverlay from '../components/LazyOverlay';

const { useCallback } = React;

const PlaylistManager = createLazyOverlay({
  loader: () => import('../components/PlaylistManager' /* webpackChunkName: "playlists" */),
  title: t => t('playlists.title'),
});

function PlaylistManagerContainer() {
  const { t } = useTranslator();

  const selectedPlaylist = useSelector(selectedPlaylistSelector);
  const showImportPanel = useSelector(showImportPanelSelector);
  const showSearchResults = useSelector(showSearchResultsSelector);
  const dispatch = useDispatch();

  const onCreatePlaylist = useCallback(() => (
    dispatch(createPlaylist(t('playlists.defaultName')))
  ), [dispatch, t]);

  return (
    <PlaylistManager
      selectedPlaylist={selectedPlaylist}
      showImportPanel={showImportPanel}
      showSearchResults={showSearchResults}
      onCreatePlaylist={onCreatePlaylist}
    />
  );
}

export default PlaylistManagerContainer;
