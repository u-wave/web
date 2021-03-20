import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Overlay from '../Overlay';
import OverlayHeader from '../Overlay/Header';

const { lazy, Suspense } = React;

const AdminComponent = lazy(() => (
  import('../../admin/containers/AdminApp')
));

const Fallback = () => <CircularProgress size="100%" />;

const AdminProxy = ({ onCloseOverlay }) => (
  <Overlay className="AppColumn AppColumn--full" direction="top">
    <OverlayHeader
      title="Administration"
      onCloseOverlay={onCloseOverlay}
      direction="top"
    />
    <div className="AdminPanel">
      <Suspense fallback={<Fallback />}>
        <AdminComponent />
      </Suspense>
    </div>
  </Overlay>
);

AdminProxy.propTypes = {
  onCloseOverlay: PropTypes.func.isRequired,
};

export default AdminProxy;
