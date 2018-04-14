import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import lifecycle from 'recompose/lifecycle';
import UsersList from '../components/UsersList';
import { loadUsers } from '../actions/users';
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
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(props => ({
    onChangePage: (event, page) =>
      props.onLoadUsers({ offset: page * props.pageSize, limit: props.pageSize }),
  })),
  lifecycle({
    componentDidMount() {
      this.props.onChangePage(null, 0);
    },
  }),
)(UsersList);
