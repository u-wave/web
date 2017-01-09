import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import UsersList from '../components/UsersList';
import { pageSelector, usersSelector } from '../selectors/userSelectors';

const mapStateToProps = createStructuredSelector({
  currentPage: pageSelector,
  users: usersSelector
});

export default connect(mapStateToProps)(UsersList);
