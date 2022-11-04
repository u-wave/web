import React from 'react';
import { useSelector, useStore } from 'react-redux';
import { SWRConfig } from 'swr';
import AdminApp from '../components/AdminApp';
import adminReducer from '../reducers';
import { transition } from '../actions/view';
import { currentViewSelector } from '../selectors/viewSelectors';
import { get } from '../../actions/RequestActionCreators';

const {
  useCallback,
  useMemo,
} = React;

function hasAdminState(store) {
  const state = store.getState();

  return state && !!state.admin;
}

function mountAdminReducer(store) {
  store.mount('admin', adminReducer);
}

function mountAdminReducerOnce(store) {
  if (!hasAdminState(store)) {
    mountAdminReducer(store);
  }
}

function AdminAppContainer() {
  const store = useStore();
  mountAdminReducerOnce(store);

  const currentView = useSelector(currentViewSelector);
  const { dispatch } = store;

  const onTransition = useCallback((target) => {
    dispatch(transition(target));
  }, [dispatch]);

  const swrConfig = useMemo(() => ({
    fetcher: (resource, init) => {
      console.log(resource, init);
      return dispatch(get(resource));
    },
  }), [dispatch]);

  return (
    <SWRConfig value={swrConfig}>
      <AdminApp
        currentView={currentView}
        onTransition={onTransition}
      />
    </SWRConfig>
  );
}

export default AdminAppContainer;
