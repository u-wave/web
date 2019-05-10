import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useMediaSources } from '../../../context/MediaSourceContext';
import {
  showImportPanel,
  hideImportPanel,
  showImportSourcePanel,
  hideImportSourcePanel,
} from '../../../actions/ImportActionCreators';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onShowImportPanel: (...args) => (dispatch) => {
    dispatch(showImportPanel());
    return dispatch(showImportSourcePanel(...args));
  },
  onHideImportPanel: (...args) => (dispatch) => {
    const result = dispatch(hideImportSourcePanel(...args));
    dispatch(hideImportPanel());
    return result;
  },
};

const enhance = connect(mapStateToProps, mapDispatchToProps);

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
