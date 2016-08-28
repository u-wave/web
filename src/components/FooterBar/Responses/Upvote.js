import * as React from 'react';
import UpvoteIcon from 'material-ui/svg-icons/action/thumb-up';

import Button from './Button';

const Upvote = ({
  active,
  count,
  onUpvote
}) => (
  <Button
    tooltip="Upvote"
    onClick={onUpvote}
    count={count}
  >
    <UpvoteIcon color={active ? '#4BB64B' : 'white'} />
  </Button>
);

Upvote.propTypes = {
  onUpvote: React.PropTypes.func.isRequired,
  count: React.PropTypes.number.isRequired,
  active: React.PropTypes.bool
};

export default Upvote;
