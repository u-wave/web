import * as React from 'react';
import DownvoteIcon from 'material-ui/svg-icons/action/thumb-down';

import Button from './Button';

const Downvote = ({
  active,
  count,
  onDownvote
}) => (
  <Button
    tooltip="Downvote"
    onClick={onDownvote}
    count={count}
  >
    <DownvoteIcon color={active ? '#B64B4B' : 'white'} />
  </Button>
);

Downvote.propTypes = {
  onDownvote: React.PropTypes.func.isRequired,
  count: React.PropTypes.number.isRequired,
  active: React.PropTypes.bool
};

export default Downvote;
