import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import { useDispatch, useSelector } from '../hooks/useRedux';
import { selectedPlaylistSelector } from '../selectors/playlistSelectors';
import { showSearchResultsSelector } from '../selectors/searchSelectors';
import { showImportPanelSelector } from '../selectors/importSelectors';
import { createPlaylist } from '../actions/PlaylistActionCreators';
import createLazyOverlay from '../components/LazyOverlay';

const { useCallback } = React;

const PlaylistManager = createLazyOverlay({
  Component: React.lazy(() => import('../components/PlaylistManager')),
  title: (t) => t('playlists.title'),
});

function PlaylistManagerContainer({ onCloseOverlay }) {
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
      onCloseOverlay={onCloseOverlay}
    />
  );
}

PlaylistManagerContainer.propTypes = {
  onCloseOverlay: PropTypes.func.isRequired,
};

export default PlaylistManagerContainer;
