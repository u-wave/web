import React from 'react';
import PropTypes from 'prop-types';
import { mdiHeart, mdiThumbDown, mdiThumbUp } from '@mdi/js';
import SvgIcon from '../SvgIcon';

const Votes = ({
  upvote, downvote, favorite, ...props
}) => (
  <div {...props}>
    {favorite && (
      <SvgIcon path={mdiHeart} className="UserRow-voteIcon UserRow-voteIcon--favorite" />
    )}
    {upvote && (
      <SvgIcon path={mdiThumbUp} className="UserRow-voteIcon UserRow-voteIcon--upvote" />
    )}
    {downvote && (
      <SvgIcon path={mdiThumbDown} className="UserRow-voteIcon UserRow-voteIcon--downvote" />
    )}
  </div>
);

Votes.propTypes = {
  upvote: PropTypes.bool,
  downvote: PropTypes.bool,
  favorite: PropTypes.bool,
};

export default Votes;
