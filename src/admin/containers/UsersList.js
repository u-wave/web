import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import UsersList from '../components/UsersList';
import { loadUsers } from '../actions/users';
import { pageSelector, usersSelector } from '../selectors/userSelectors';

const mapStateToProps = createStructuredSelector({
  currentPage: pageSelector,
  users: usersSelector,
});

const mapDispatchToProps = {
  onLoadUsers: loadUsers,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.onLoadUsers();
    },
  }),
)(UsersList);
