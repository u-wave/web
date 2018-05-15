import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingScreen = () => (
  <div className="LoadingScreen">
    <CircularProgress className="LoadingScreen-loader" />
    <p className="LoadingScreen-notice">
      üWave requires JavaScript to run.
    </p>
  </div>
);

export default LoadingScreen;
