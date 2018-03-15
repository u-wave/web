import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import lifecycle from 'recompose/lifecycle';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
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
  getContext({ store: PropTypes.object }),
  lifecycle({
    componentWillMount() {
      if (this.props.store) {
        mountAdminReducerOnce(this.props.store);
      }
    },
  }),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(AdminApp);
