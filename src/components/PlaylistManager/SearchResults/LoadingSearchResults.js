import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingSearchResults = () => (
  <div className="PlaylistPanel-loading">
    <CircularProgress size="100%" />
  </div>
);

export default LoadingSearchResults;
