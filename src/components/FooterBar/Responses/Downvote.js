import React, { Component, PropTypes } from 'react';
import DownvoteIcon from 'material-ui/lib/svg-icons/action/thumb-down';

import Button from './Button';

export default class Downvote extends Component {
  static propTypes = {
    onDownvote: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    active: PropTypes.bool
  };

  render() {
    const { active, count, onDownvote } = this.props;
    return (
      <Button
        tooltip="Downvote"
        onClick={onDownvote}
        count={count}
      >
        <DownvoteIcon color={active ? '#B64B4B' : 'white'} />
      </Button>
    );
  }
}
