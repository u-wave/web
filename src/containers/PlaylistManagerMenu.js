import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addMedia as addToPlaylist,
  createPlaylist,
  selectPlaylist,
} from '../actions/PlaylistActionCreators';
import { showImportPanel } from '../actions/ImportActionCreators';
import {
  showSearchResults,
  deleteSearch,
} from '../actions/SearchActionCreators';
import {
  playlistsSelector,
  selectedPlaylistSelector,
} from '../selectors/playlistSelectors';
import {
  searchQuerySelector,
  showSearchResultsSelector,
  searchResultsCountSelector,
} from '../selectors/searchSelectors';
import { showImportPanelSelector } from '../selectors/importSelectors';
import PlaylistsMenu from '../components/PlaylistManager/Menu';

const { useCallback } = React;

function PlaylistsMenuContainer() {
  const playlists = useSelector(playlistsSelector);
  const selected = useSelector(selectedPlaylistSelector);
  const searchQuery = useSelector(searchQuerySelector);
  const isShowSearchResults = useSelector(showSearchResultsSelector);
  const searchResults = useSelector(searchResultsCountSelector);
  const isShowImportPanel = useSelector(showImportPanelSelector);
  const dispatch = useDispatch();

  const onAddToPlaylist = useCallback(
    (playlist, items, afterID) => dispatch(addToPlaylist(playlist, items, afterID)),
    [],
  );
  const onCreatePlaylist = useCallback((name) => dispatch(createPlaylist(name)), []);
  const onSelectPlaylist = useCallback((id) => dispatch(selectPlaylist(id)), []);
  const onSelectSearchResults = useCallback(() => dispatch(showSearchResults()), []);
  const onCloseSearchResults = useCallback(() => dispatch(deleteSearch()), []);
  const onShowImportPanel = useCallback(() => dispatch(showImportPanel()), []);

  return (
    <PlaylistsMenu
      playlists={playlists}
      selected={selected}
      searchQuery={searchQuery}
      showSearchResults={isShowSearchResults}
      searchResults={searchResults}
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

export default PlaylistsMenuContainer;
