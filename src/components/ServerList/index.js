import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const ServerListContainer = React.lazy(() => import('@u-wave/react-server-list')
  .then(({ Container }) => ({ default: Container })));

function ServerList(props) {
  const loading = (
    <div className="ServerList ServerList--loading">
      <CircularProgress />
    </div>
  );

  return (
    <React.Suspense fallback={loading}>
      <div className="ServerList">
        <ServerListContainer {...props} />
      </div>
    </React.Suspense>
  );
}

export default ServerList;
