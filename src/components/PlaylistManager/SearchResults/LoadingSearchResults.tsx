import CircularProgress from '../../CircularProgress';

function LoadingSearchResults() {
  return (
    <div className="PlaylistPanel-loading">
      <CircularProgress size="100%" />
    </div>
  );
}

export default LoadingSearchResults;
