import React from 'react';
import PropTypes from 'prop-types';
import { useMediaSources } from '../../../context/MediaSourceContext';

const PlaylistImport = ({
  selectedSourceType,
  sourceStates,
  onShowImportPanel,
  onHideImportPanel,
}) => {
  const { getMediaSource, getAllMediaSources } = useMediaSources();

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

  return (
    <div className="PlaylistImport">
      {forms}
    </div>
  );
};

PlaylistImport.propTypes = {
  selectedSourceType: PropTypes.string,
  sourceStates: PropTypes.object,
  onShowImportPanel: PropTypes.func.isRequired,
  onHideImportPanel: PropTypes.func.isRequired,
};

export default PlaylistImport;
