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

  const onShowImportPanel = (...args) => {
    dispatch(showImportPanel());
    return dispatch(showImportSourcePanel(...args));
  };
  const onHideImportPanel = (...args) => {
    const result = dispatch(hideImportSourcePanel(...args));
    dispatch(hideImportPanel());
    return result;
  };

  const forms = [];
  const sources = getAllMediaSources();
  Object.keys(sources).forEach((sourceType) => {
    const { ImportForm } = sources[sourceType];
    if (ImportForm) {
      forms.push((
        <ImportForm
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
