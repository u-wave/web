import CircularProgress from '@mui/material/CircularProgress';

function LoadingSearchResults() {
  return (
    <div className="PlaylistPanel-loading">
      <CircularProgress size="100%" />
    </div>
  );
}

export default LoadingSearchResults;
