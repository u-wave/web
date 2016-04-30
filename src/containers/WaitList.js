import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { moveWaitlistUser } from '../actions/ModerationActionCreators';
import { waitlistUsersSelector } from '../selectors/waitlistSelectors';
import { isModeratorSelector } from '../selectors/userSelectors';
import WaitList from '../components/WaitList';

const mapStateToProps = createStructuredSelector({
  users: waitlistUsersSelector,
  canMoveUsers: isModeratorSelector
});

const mapDispatchToProps = dispatch => ({
  onMoveUser: user => bindActionCreators(
    position => moveWaitlistUser(user, position),
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(WaitList);
