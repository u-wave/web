import React from 'react';
import Loader from '../Loader';

const LoadingScreen = () => (
  <div className="LoadingScreen">
    <Loader className="LoadingScreen-loader" size="large" />
    <p className="LoadingScreen-notice">
      üWave requires JavaScript to run.
    </p>
  </div>
);

export default LoadingScreen;
