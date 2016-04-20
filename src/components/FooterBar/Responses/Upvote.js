/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
import UpvoteIcon from 'material-ui/lib/svg-icons/action/thumb-up';

import Button from './Button';

export default class Upvote extends Component {
  static propTypes = {
    onUpvote: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    active: PropTypes.bool
  };

  render() {
    const { active, count, onUpvote } = this.props;
    return (
      <Button
        tooltip="Upvote"
        onClick={onUpvote}
        count={count}
      >
        <UpvoteIcon color={active ? '#4BB64B' : 'white'} />
      </Button>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
