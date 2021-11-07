import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import WarningIcon from '@mui/icons-material/Warning';

function LoadingIndicator() {
  return (
    <div className="LoadingIndicator">
      <CircularProgress className="LoadingIndicator-loader" />
      <div className="LoadingIndicator-warning" hidden>
        <WarningIcon color="error" fontSize="large" />
      </div>
      <p className="LoadingIndicator-notice">
        üWave requires JavaScript to run.
      </p>
    </div>
  );
}

export default LoadingIndicator;
