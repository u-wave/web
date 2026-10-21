import { SWRConfig } from 'swr';
import uwFetch from '../../utils/fetch';
import AdminApp from '../components/AdminApp';

const swrConfig = { fetcher: uwFetch };

function AdminAppContainer() {
  return (
    <SWRConfig value={swrConfig}>
      <AdminApp />
    </SWRConfig>
  );
}

export default AdminAppContainer;
