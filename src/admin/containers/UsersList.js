import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import lifecycle from 'recompose/lifecycle';
import UsersList from '../components/UsersList';
import {
  loadUsers,
  setUsersFilter,
} from '../actions/users';
import {
  pageSelector,
  pageSizeSelector,
  totalUsersSelector,
  usersSelector,
} from '../selectors/userSelectors';

const mapStateToProps = createStructuredSelector({
  currentPage: pageSelector,
  pageSize: pageSizeSelector,
  totalUsers: totalUsersSelector,
  users: usersSelector,
});

const mapDispatchToProps = {
  onLoadUsers: loadUsers,
  onFilter: setUsersFilter,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(props => ({
    onChangePage: (event, page) =>
      props.onLoadUsers({ offset: page * props.pageSize, limit: props.pageSize }),
    onFilter: (filter) => {
      props.onFilter(filter);
      props.onLoadUsers({ offset: 0, limit: props.pageSize });
    },
  })),
  lifecycle({
    componentDidMount() {
      this.props.onChangePage(null, 0);
    },
  }),
);

export default enhance(UsersList);
