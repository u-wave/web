import * as React from 'react';

import injectMediaSources from '../../../utils/injectMediaSources';

const PlaylistImport = ({
  getMediaSource,
  getAllMediaSources,
  selectedSourceType,
  sourceStates,
  onShowImportPanel,
  onHideImportPanel
}) => {
  if (selectedSourceType) {
    const Panel = getMediaSource(selectedSourceType).ImportPanel;
    const state = sourceStates[selectedSourceType];
    return (
      <Panel
        onClosePanel={onHideImportPanel}
        {...state}
      />
    );
  }

  const forms = [];
  const sources = getAllMediaSources();
  Object.keys(sources).forEach((sourceType) => {
    const ImportForm = sources[sourceType].ImportForm;
    if (ImportForm) {
      forms.push(
        <ImportForm
          key={sourceType}
          onShowImportPanel={() => onShowImportPanel(sourceType)}
        />
      );
    }
  });

  return (
    <div className="PlaylistImport">
      {forms}
    </div>
  );
};

PlaylistImport.propTypes = {
  selectedSourceType: React.PropTypes.string,
  sourceStates: React.PropTypes.object,

  getMediaSource: React.PropTypes.func.isRequired,
  getAllMediaSources: React.PropTypes.func.isRequired,
  onShowImportPanel: React.PropTypes.func.isRequired,
  onHideImportPanel: React.PropTypes.func.isRequired
};

export default injectMediaSources()(PlaylistImport);
