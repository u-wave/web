import * as React from 'react';
import { translate } from 'react-i18next';
import UpvoteIcon from 'material-ui/svg-icons/action/thumb-up';

import Button from './Button';

const Upvote = ({
  t,
  active,
  count,
  onUpvote
}) => (
  <Button
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
  active: React.PropTypes.bool
};

export default translate()(Upvote);
