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
      upvote: votes.upvotes.includes(user._id),
      downvote: votes.downvotes.includes(user._id),
      favorite: votes.favorites.includes(user._id),
    },
  })),
);

const mapStateToProps = createStructuredSelector({
  users: userListWithVotesSelector,
  guests: guestCountSelector,
});

export default connect(mapStateToProps)(RoomUserList);
