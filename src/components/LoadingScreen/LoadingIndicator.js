import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import WarningIcon from '@material-ui/icons/Warning';

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
