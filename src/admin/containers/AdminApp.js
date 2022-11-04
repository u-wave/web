import React from 'react';
import { useDispatch } from 'react-redux';
import { SWRConfig } from 'swr';
import AdminApp from '../components/AdminApp';
import { get } from '../../actions/RequestActionCreators';

const {
  useMemo,
} = React;

function AdminAppContainer() {
  const dispatch = useDispatch();
  const swrConfig = useMemo(() => ({
    fetcher: (resource) => {
      return dispatch(get(resource));
    },
  }), [dispatch]);

  return (
    <SWRConfig value={swrConfig}>
      <AdminApp />
    </SWRConfig>
  );
}

export default AdminAppContainer;
