import * as React from 'react';
import { translate } from 'react-i18next';
import UpvoteIcon from 'material-ui/svg-icons/action/thumb-up';

import Button from './Button';

const Upvote = ({
  t,
  disabled,
  active,
  count,
  onUpvote
}) => (
  <Button
    disabled={disabled}
    tooltip={t('votes.upvote')}
    onClick={onUpvote}
    count={count}
  >
    <UpvoteIcon color={active ? '#4BB64B' : 'white'} />
  </Button>
);

Upvote.propTypes = {
  t: React.PropTypes.func.isRequired,
  onUpvote: React.PropTypes.func.isRequired,
  count: React.PropTypes.number.isRequired,
  disabled: React.PropTypes.bool,
  active: React.PropTypes.bool
};

export default translate()(Upvote);
