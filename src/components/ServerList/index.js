import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const ServerListContainer = React.lazy(() => Promise.all([
  import('@u-wave/react-server-list/dist/u-wave-react-server-list.css'),
  import('@u-wave/react-server-list'),
]).then(([, js]) => ({ default: js.Container })));

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
