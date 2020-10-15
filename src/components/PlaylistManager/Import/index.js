import React from 'react';
import PropTypes from 'prop-types';
import { useMediaSources } from '../../../context/MediaSourceContext';
import LoadingPanel from './LoadingPanel';

const { Suspense } = React;

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
    // The panels may be lazy loaded.
    return (
      <Suspense fallback={<LoadingPanel />}>
        <Panel
          onClosePanel={onHideImportPanel}
          {...state}
        />
      </Suspense>
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
