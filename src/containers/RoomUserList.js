import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { userListSelector } from '../selectors/userSelectors';
import UserList from '../components/UserList';

const mapStateToProps = createStructuredSelector({
  users: userListSelector
});

export default connect(mapStateToProps)(UserList);
