import React from 'react';
import { useDispatch } from 'react-redux';
import { openPreviewMediaDialog } from '../actions/DialogActionCreators';
import { addMediaMenu } from '../actions/PlaylistActionCreators';
import { useMediaSearchStore } from '../stores/MediaSearchStore';
import SearchResults from '../components/PlaylistManager/SearchResults';

const { useCallback } = React;

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
  const dispatch = useDispatch();
  const onOpenAddMediaMenu = useCallback((position, media, selection) => (
    dispatch(addMediaMenu(selectionOrOne(media, selection), position))
  ), []);
  const onOpenPreviewMediaDialog = useCallback(
    (media) => dispatch(openPreviewMediaDialog(media)),
    [],
  );

  return (
    <SearchResults
      query={query}
      results={results}
      loadingState={state}
      onOpenAddMediaMenu={onOpenAddMediaMenu}
      onOpenPreviewMediaDialog={onOpenPreviewMediaDialog}
    />
  );
}

export default SearchResultsContainer;
