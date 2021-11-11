import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingSearchResults = () => (
  <div className="PlaylistPanel-loading">
    <CircularProgress size="100%" />
  </div>
);

export default LoadingSearchResults;
