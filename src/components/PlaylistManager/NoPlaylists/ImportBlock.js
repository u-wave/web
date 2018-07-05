import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useMediaSources } from '../../../context/MediaSourceContext';
import { showImportPanel, hideImportPanel } from '../../../actions/ImportActionCreators';

const enhance =  connect(() => ({}), {
  onShowImportPanel: showImportPanel,
  onHideImportPanel: hideImportPanel
});

function ImportBlock({ onShowImportPanel, onHideImportPanel }) {
  const { getAllMediaSources } = useMediaSources();

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
    <React.Fragment>
      {forms}
    </React.Fragment>
  );
}

ImportBlock.propTypes = {
  onShowImportPanel: PropTypes.func.isRequired,
  onHideImportPanel: PropTypes.func.isRequired,
};

export default enhance(ImportBlock);
