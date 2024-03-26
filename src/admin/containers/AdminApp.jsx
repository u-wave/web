import { SWRConfig } from 'swr';
import AdminApp from '../components/AdminApp';
import uwFetch from '../../utils/fetch';

const swrConfig = { fetcher: uwFetch };

function AdminAppContainer() {
  return (
    <SWRConfig value={swrConfig}>
      <AdminApp />
    </SWRConfig>
  );
}

export default AdminAppContainer;
