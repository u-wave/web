import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';

const ErrorArea = ({ error, onDismiss }) => (
  <div className="ErrorArea">
    <Snackbar
      ContentProps={{ className: 'ErrorArea-snackbar' }}
      open={!!error}
      message={error || ''}
      onClose={onDismiss}
    />
  </div>
);

ErrorArea.propTypes = {
  error: PropTypes.string,
  onDismiss: PropTypes.func.isRequired,
};

export default ErrorArea;
