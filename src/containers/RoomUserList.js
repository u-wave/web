import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import {
  userListSelector,
  guestCountSelector,
} from '../selectors/userSelectors';
import { currentVotesSelector } from '../selectors/voteSelectors';
import RoomUserList from '../components/RoomUserList';

const userListWithVotesSelector = createSelector(
  userListSelector,
  currentVotesSelector,
  (users, votes) => users.map(user => ({
    ...user,
    votes: {
      upvote: votes.upvotes.indexOf(user._id) !== -1,
      downvote: votes.downvotes.indexOf(user._id) !== -1,
      favorite: votes.favorites.indexOf(user._id) !== -1,
    },
  })),
);

const mapStateToProps = createStructuredSelector({
  users: userListWithVotesSelector,
  guests: guestCountSelector,
});

export default connect(mapStateToProps)(RoomUserList);
