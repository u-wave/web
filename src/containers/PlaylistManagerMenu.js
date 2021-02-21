import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  addMedia as addToPlaylist,
  createPlaylist,
  selectPlaylist,
} from '../actions/PlaylistActionCreators';
import { showImportPanel } from '../actions/ImportActionCreators';
import { showSearchResults } from '../actions/SearchActionCreators';
import {
  playlistsSelector,
  selectedPlaylistSelector,
} from '../selectors/playlistSelectors';
import { showSearchResultsSelector } from '../selectors/searchSelectors';
import { showImportPanelSelector } from '../selectors/importSelectors';
import { useMediaSearchStore } from '../stores/MediaSearchStore';
import PlaylistsMenu from '../components/PlaylistManager/Menu';

const { useCallback } = React;

function PlaylistsMenuContainer({ className }) {
  const playlists = useSelector(playlistsSelector);
  const selected = useSelector(selectedPlaylistSelector);
  const mediaSearch = useMediaSearchStore();
  const isShowSearchResults = useSelector(showSearchResultsSelector);
  const isShowImportPanel = useSelector(showImportPanelSelector);
  const dispatch = useDispatch();

  const onAddToPlaylist = useCallback(
    (playlist, items, afterID) => dispatch(addToPlaylist(playlist, items, afterID)),
    [dispatch],
  );
  const onCreatePlaylist = useCallback((name) => dispatch(createPlaylist(name)), [dispatch]);
  const onSelectPlaylist = useCallback((id) => dispatch(selectPlaylist(id)), [dispatch]);
  const onSelectSearchResults = useCallback(() => dispatch(showSearchResults()), [dispatch]);
  const onCloseSearchResults = useCallback(() => {
    mediaSearch.search(null);
    // The `mediaSearch.search` reference never changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onShowImportPanel = useCallback(() => dispatch(showImportPanel()), [dispatch]);

  return (
    <PlaylistsMenu
      className={className}
      playlists={playlists}
      selected={selected}
      searchQuery={mediaSearch.query}
      showSearchResults={isShowSearchResults}
      searchResults={mediaSearch.resultsCount}
      showImportPanel={isShowImportPanel}
      onAddToPlaylist={onAddToPlaylist}
      onCreatePlaylist={onCreatePlaylist}
      onSelectPlaylist={onSelectPlaylist}
      onSelectSearchResults={onSelectSearchResults}
      onCloseSearchResults={onCloseSearchResults}
      onShowImportPanel={onShowImportPanel}
    />
  );
}

PlaylistsMenuContainer.propTypes = {
  className: PropTypes.string,
};

export default PlaylistsMenuContainer;
