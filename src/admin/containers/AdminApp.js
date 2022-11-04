import React from 'react';
import { useDispatch } from 'react-redux';
import { SWRConfig } from 'swr';
import AdminApp from '../components/AdminApp';
import { get } from '../../actions/RequestActionCreators';

const {
  useMemo,
  useState,
} = React;

function AdminAppContainer() {
  const [view, setView] = useState('main');
  const dispatch = useDispatch();

  const swrConfig = useMemo(() => ({
    fetcher: (resource) => {
      return dispatch(get(resource));
    },
  }), [dispatch]);

  return (
    <SWRConfig value={swrConfig}>
      <AdminApp
        currentView={view}
        onTransition={setView}
      />
    </SWRConfig>
  );
}

export default AdminAppContainer;
