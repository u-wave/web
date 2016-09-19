import * as React from 'react';
import { translate } from 'react-i18next';
import DownvoteIcon from 'material-ui/svg-icons/action/thumb-down';

import Button from './Button';

const Downvote = ({
  t,
  active,
  count,
  onDownvote
}) => (
  <Button
    tooltip={t('votes.downvote')}
    onClick={onDownvote}
    count={count}
  >
    <DownvoteIcon color={active ? '#B64B4B' : 'white'} />
  </Button>
);

Downvote.propTypes = {
  t: React.PropTypes.func.isRequired,
  onDownvote: React.PropTypes.func.isRequired,
  count: React.PropTypes.number.isRequired,
  active: React.PropTypes.bool
};

export default translate()(Downvote);
