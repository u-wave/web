import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import AdminApp from '../components/AdminApp';
import adminReducer from '../reducers';
import { transition } from '../actions/view';
import { currentViewSelector } from '../selectors/viewSelectors';

const {
  useCallback,
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
  const dispatch = useDispatch();

  const onTransition = useCallback((target) => {
    dispatch(transition(target));
  }, [dispatch]);

  return (
    <AdminApp
      currentView={currentView}
      onTransition={onTransition}
    />
  );
}

export default AdminAppContainer;
