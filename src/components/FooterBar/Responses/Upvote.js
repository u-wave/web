import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import UpvoteIcon from '@material-ui/icons/ThumbUp';
import Button from './Button';

const enhance = translate();

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
    <UpvoteIcon className={active ? 'ResponseButton-icon--upvoted' : ''} />
  </Button>
);

Upvote.propTypes = {
  t: PropTypes.func.isRequired,
  onUpvote: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

export default enhance(Upvote);
