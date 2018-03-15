import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import UpvoteIcon from 'material-ui/svg-icons/action/thumb-up';

import Button from './Button';

const Upvote = ({
  t,
  disabled,
  active,
  count,
  onUpvote,
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
  t: PropTypes.func.isRequired,
  onUpvote: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

export default translate()(Upvote);
