import * as React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

import DownvoteIcon from 'material-ui/svg-icons/action/thumb-down';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import UpvoteIcon from 'material-ui/svg-icons/action/thumb-up';

const Votes = ({ muiTheme, upvote, downvote, favorite, ...props }) => (
  <div {...props}>
    {favorite && (
      <FavoriteIcon
        className="UserRow-voteIcon"
        color={muiTheme.palette.primary1Color}
      />
    )}
    {upvote && (
      <UpvoteIcon
        className="UserRow-voteIcon"
        color="#4BB64B"
      />
    )}
    {downvote && (
      <DownvoteIcon
        className="UserRow-voteIcon"
        color="#B64B4B"
      />
    )}
  </div>
);

Votes.propTypes = {
  muiTheme: React.PropTypes.object.isRequired,
  upvote: React.PropTypes.bool,
  downvote: React.PropTypes.bool,
  favorite: React.PropTypes.bool
};

export default muiThemeable()(Votes);
