import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openPreviewMediaDialog } from '../actions/DialogActionCreators';
import { addMediaMenu } from '../actions/PlaylistActionCreators';
import {
  searchQuerySelector,
  searchResultsSelector,
  searchLoadingStateSelector,
} from '../selectors/searchSelectors';
import SearchResults from '../components/PlaylistManager/SearchResults';

const { useCallback } = React;

const selectionOrOne = (media, selection) => {
  if (selection.isSelected(media)) {
    return selection.get();
  }
  return [media];
};

function SearchResultsContainer() {
  const query = useSelector(searchQuerySelector);
  const results = useSelector(searchResultsSelector);
  const loadingState = useSelector(searchLoadingStateSelector);
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
      loadingState={loadingState}
      onOpenAddMediaMenu={onOpenAddMediaMenu}
      onOpenPreviewMediaDialog={onOpenPreviewMediaDialog}
    />
  );
}

export default SearchResultsContainer;
