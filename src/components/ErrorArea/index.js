import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';

function ErrorArea({ error, onDismiss }) {
  return (
    <div className="ErrorArea">
      <Snackbar
        ContentProps={{ className: 'ErrorArea-snackbar' }}
        open={!!error}
        message={error || ''}
        onClose={onDismiss}
      />
    </div>
  );
}

ErrorArea.propTypes = {
  error: PropTypes.string,
  onDismiss: PropTypes.func.isRequired,
};

export default ErrorArea;
