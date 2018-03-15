import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  moveWaitlistUser,
  removeWaitlistUser,
} from '../actions/ModerationActionCreators';
import { waitlistUsersSelector } from '../selectors/waitlistSelectors';
import { createRoleCheckSelector } from '../selectors/userSelectors';
import WaitList from '../components/WaitList';

const mapStateToProps = createStructuredSelector({
  users: waitlistUsersSelector,
  canMoveUsers: createRoleCheckSelector('waitlist.move'),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMoveUser: moveWaitlistUser,
  onRemoveUser: removeWaitlistUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WaitList);
