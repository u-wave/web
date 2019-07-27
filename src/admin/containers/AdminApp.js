import React from 'react';
import { connect, useStore } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import { createStructuredSelector } from 'reselect';
import AdminApp from '../components/AdminApp';
import adminReducer from '../reducers';
import { transition } from '../actions/view';
import { currentViewSelector } from '../selectors/viewSelectors';

const mapStateToProps = createStructuredSelector({
  currentView: currentViewSelector,
});

const mapDispatchToProps = {
  onTransition: transition,
};

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

const enhance = compose(
  lifecycle({
    componentWillMount() {
      if (this.props.store) {
        mountAdminReducerOnce(this.props.store);
      }
    },
  }),
  connect(mapStateToProps, mapDispatchToProps),
);

const ConnectedApp = enhance(AdminApp);

export default function AdminAppWrapper(props) {
  const store = useStore();

  return <ConnectedApp store={store} {...props} />;
}
