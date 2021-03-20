import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openPreviewMediaDialog } from '../actions/DialogActionCreators';
import { addMediaMenu } from '../actions/PlaylistActionCreators';
import { useMediaSearchStore } from '../stores/MediaSearchStore';
import { playlistsByIDSelector } from '../selectors/playlistSelectors';
import SearchResults from '../components/PlaylistManager/SearchResults';

const {
  useCallback,
  useMemo,
} = React;

const selectionOrOne = (media, selection) => {
  if (selection.isSelected(media)) {
    return selection.get();
  }
  return [media];
};

function SearchResultsContainer() {
  const {
    query,
    results,
    state,
  } = useMediaSearchStore();

  const playlistsByID = useSelector(playlistsByIDSelector);
  const dispatch = useDispatch();

  const resultsWithPlaylists = useMemo(() => {
    if (!results) {
      return [];
    }
    return results.map((result) => {
      if (!Array.isArray(result.inPlaylists)) {
        return result;
      }
      return {
        ...result,
        inPlaylists: result.inPlaylists
          .map((id) => playlistsByID[id])
          // If we don't know about a playlist for some reason, ignore it.
          // That would be a bug, but not showing it is better than crashing!
          .filter(Boolean),
      };
    });
  }, [results, playlistsByID]);

  const onOpenAddMediaMenu = useCallback((position, media, selection) => (
    dispatch(addMediaMenu(selectionOrOne(media, selection), position))
  ), [dispatch]);
  const onOpenPreviewMediaDialog = useCallback(
    (media) => dispatch(openPreviewMediaDialog(media)),
    [dispatch],
  );

  return (
    <SearchResults
      query={query}
      results={resultsWithPlaylists}
      loadingState={state}
      onOpenAddMediaMenu={onOpenAddMediaMenu}
      onOpenPreviewMediaDialog={onOpenPreviewMediaDialog}
    />
  );
}

export default SearchResultsContainer;
