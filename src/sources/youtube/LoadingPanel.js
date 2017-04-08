import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader';
import ImportPanelHeader from '../../components/PlaylistManager/Import/ImportPanelHeader';

const LoadingPanel = ({ onClosePanel }) => (
  <div className="ImportPanel">
    <ImportPanelHeader onClosePanel={onClosePanel} />
    <div className="ImportPanel-loading">
      <Loader size="large" />
    </div>
  </div>
);

LoadingPanel.propTypes = {
  onClosePanel: PropTypes.func.isRequired
};

export default LoadingPanel;
