import React from 'react';
import PropTypes from 'prop-types';
import loadable from 'react-loadable';
import CircularProgress from '@material-ui/core/CircularProgress';
import Overlay from '../Overlay';
import OverlayHeader from '../Overlay/Header';

const AdminComponent = loadable({
  loader: () => import('../../admin/containers/AdminApp' /* webpackChunkName: "admin" */),
  loading: () => <CircularProgress size="100%" />,
});

const AdminProxy = ({ onCloseOverlay }) => (
  <Overlay className="AppColumn AppColumn--full" direction="top">
    <OverlayHeader
      title="Administration"
      onCloseOverlay={onCloseOverlay}
      direction="top"
    />
    <div className="AppRow AppRow--middle AdminPanel">
      <AdminComponent />
    </div>
  </Overlay>
);

AdminProxy.propTypes = {
  onCloseOverlay: PropTypes.func.isRequired,
};

export default AdminProxy;
