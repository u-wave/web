import { lazy, Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Overlay from '../Overlay';
import OverlayHeader from '../Overlay/Header';

const AdminComponent = lazy(() => (
  import('../../admin/containers/AdminApp')
));

function Fallback() {
  return <CircularProgress size="100%" />;
}

type AdminProxyProps = {
  onCloseOverlay: () => void,
};
function AdminProxy({ onCloseOverlay }: AdminProxyProps) {
  return (
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
}

export default AdminProxy;
