import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from '../hooks/useRedux';
import {
  addMedia as addToPlaylist,
  createPlaylist,
} from '../actions/PlaylistActionCreators';
import { hideSearchResults } from '../actions/SearchActionCreators';
import {
  playlistsSelector,
  selectedPlaylistIDSelector,
} from '../selectors/playlistSelectors';
import { useMediaSearchStore } from '../stores/MediaSearchStore';
import PlaylistsMenu from '../components/PlaylistManager/Menu';
import { selectPlaylist, showImportPanel, showSearchResults } from '../reducers/playlists';

const { useCallback } = React;

function PlaylistsMenuContainer({ className }) {
  const playlists = useSelector(playlistsSelector);
  const selected = useSelector(selectedPlaylistIDSelector);
  const mediaSearch = useMediaSearchStore();
  const dispatch = useDispatch();

  const onAddToPlaylist = useCallback(
    (playlist, items, afterID) => dispatch(addToPlaylist(playlist, items, afterID)),
    [dispatch],
  );
  const onCreatePlaylist = useCallback((name) => dispatch(createPlaylist(name)), [dispatch]);
  const onSelectPlaylist = useCallback((id) => dispatch(selectPlaylist(id)), [dispatch]);
  const onSelectSearchResults = useCallback(() => dispatch(showSearchResults()), [dispatch]);
  const onCloseSearchResults = useCallback(() => {
    mediaSearch.reset();
    dispatch(hideSearchResults());
    // The `mediaSearch.reset` reference never changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const onShowImportPanel = useCallback(() => dispatch(showImportPanel()), [dispatch]);

  return (
    <PlaylistsMenu
      className={className}
      playlists={playlists}
      selected={selected}
      searchQuery={mediaSearch.query}
      searchResults={mediaSearch.resultsCount}
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
