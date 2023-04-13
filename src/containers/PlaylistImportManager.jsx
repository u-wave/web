import React from 'react';
import { useSelector, useDispatch } from '../hooks/useRedux';
import {
  showImportSourcePanel,
  hideImportSourcePanel,
} from '../actions/ImportActionCreators';
import { selectedSourceTypeSelector } from '../reducers/imports';
import PlaylistImport from '../components/PlaylistManager/Import';

const { useCallback } = React;

function PlaylistImportContainer() {
  const selectedSourceType = useSelector(selectedSourceTypeSelector);
  const sourceStates = useSelector((state) => state.sources);
  const dispatch = useDispatch();
  const onShowImportPanel = useCallback(
    (sourceType) => dispatch(showImportSourcePanel(sourceType)),
    [dispatch],
  );
  const onHideImportPanel = useCallback(() => dispatch(hideImportSourcePanel()), [dispatch]);

  return (
    <PlaylistImport
      selectedSourceType={selectedSourceType}
      sourceStates={sourceStates}
      onShowImportPanel={onShowImportPanel}
      onHideImportPanel={onHideImportPanel}
    />
  );
}

export default PlaylistImportContainer;
