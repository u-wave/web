import { useDispatch } from '../../../hooks/useRedux';
import { useMediaSources } from '../../../context/MediaSourceContext';
import { showImportSourcePanel, hideImportSourcePanel } from '../../../reducers/imports';
import { showImportPanel } from '../../../reducers/playlists';

function ImportBlock() {
  const { getAllMediaSources } = useMediaSources();
  const dispatch = useDispatch();

  const onShowImportPanel = (sourceType: string) => {
    dispatch(showImportPanel());
    return dispatch(showImportSourcePanel(sourceType));
  };
  const onHideImportPanel = () => {
    dispatch(hideImportSourcePanel());
  };

  const forms: React.ReactElement[] = [];
  const sources = getAllMediaSources();
  Object.entries(sources).forEach(([sourceType, source]) => {
    if (source.ImportForm) {
      forms.push((
        <source.ImportForm
          key={sourceType}
          onShowImportPanel={() => onShowImportPanel(sourceType)}
          onHideImportPanel={onHideImportPanel}
        />
      ));
    }
  });

  return forms;
}

export default ImportBlock;
