import React from 'react';
import { SWRConfig } from 'swr';
import { useDispatch } from '../../hooks/useRedux';
import AdminApp from '../components/AdminApp';
import { get } from '../../actions/RequestActionCreators';

const {
  useMemo,
} = React;

function AdminAppContainer() {
  const dispatch = useDispatch();
  const swrConfig = useMemo(() => ({
    fetcher: (arg) => {
      if (Array.isArray(arg)) {
        const [resource, options = {}] = arg;
        return dispatch(get(resource, options));
      }
      return dispatch(get(arg));
    },
  }), [dispatch]);

  return (
    <SWRConfig value={swrConfig}>
      <AdminApp />
    </SWRConfig>
  );
}

export default AdminAppContainer;
