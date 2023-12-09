import { useDispatch } from '../../../hooks/useRedux';
import { useMediaSources } from '../../../context/MediaSourceContext';
import {
  hideImportPanel,
  showImportSourcePanel,
  hideImportSourcePanel,
} from '../../../actions/ImportActionCreators';
import { showImportPanel } from '../../../reducers/playlists';

function ImportBlock() {
  const { getAllMediaSources } = useMediaSources();
  const dispatch = useDispatch();

  const onShowImportPanel = (sourceType: string) => {
    dispatch(showImportPanel());
    return dispatch(showImportSourcePanel(sourceType));
  };
  const onHideImportPanel = () => {
    const result = dispatch(hideImportSourcePanel());
    dispatch(hideImportPanel());
    return result;
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
