import { useCallback } from 'react';
import { useSelector, useDispatch } from '../hooks/useRedux';
import {
  showImportSourcePanel,
  hideImportSourcePanel,
  selectedSourceTypeSelector,
} from '../reducers/imports';
import PlaylistImport from '../components/PlaylistManager/Import';

function PlaylistImportContainer() {
  const selectedSourceType = useSelector(selectedSourceTypeSelector);
  const sourceStates = useSelector((state) => state.mediaSources);
  const dispatch = useDispatch();
  const onShowImportPanel = useCallback(
    (sourceType: string) => dispatch(showImportSourcePanel(sourceType)),
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
