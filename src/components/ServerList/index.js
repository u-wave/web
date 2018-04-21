import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import loadable from 'react-loadable';

const ServerList = loadable({
  loader: () => import('@u-wave/react-server-list' /* webpackChunkName: "serverList" */),
  loading: () => (
    <div className="ServerList ServerList--loading">
      <CircularProgress />
    </div>
  ),
  render(loaded, props) {
    const { Container } = loaded;
    return (
      <div className="ServerList">
        <Container {...props} />
      </div>
    );
  },
});

export default ServerList;
