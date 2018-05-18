import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import ImportPanelHeader from '../../components/PlaylistManager/Import/ImportPanelHeader';

const LoadingPanel = ({ onClosePanel }) => (
  <div className="ImportPanel">
    <ImportPanelHeader onClosePanel={onClosePanel} />
    <div className="ImportPanel-loading">
      <CircularProgress size="100%" />
    </div>
  </div>
);

LoadingPanel.propTypes = {
  onClosePanel: PropTypes.func.isRequired,
};

export default LoadingPanel;
