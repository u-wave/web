import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import loadable from 'react-loadable';

const ServerList = loadable({
  loader: () => import('@u-wave/react-server-list' /* webpackChunkName: "serverList" */),
  loading: () => <CircularProgress />,
  render(loaded, props) {
    const { Container } = loaded;
    return <Container {...props} />;
  },
});

export default ServerList;
