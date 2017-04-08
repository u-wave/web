import React from 'react';
import PropTypes from 'prop-types';
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
  selectedSourceType: PropTypes.string,
  sourceStates: PropTypes.object,

  getMediaSource: PropTypes.func.isRequired,
  getAllMediaSources: PropTypes.func.isRequired,
  onShowImportPanel: PropTypes.func.isRequired,
  onHideImportPanel: PropTypes.func.isRequired
};

export default injectMediaSources()(PlaylistImport);
