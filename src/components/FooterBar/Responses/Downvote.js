import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import DownvoteIcon from '@material-ui/icons/ThumbDown';
import Button from './Button';

const enhance = translate();

const Downvote = ({
  t,
  disabled,
  active,
  count,
  onDownvote,
}) => (
  <Button
    disabled={disabled}
    tooltip={t('votes.downvote')}
    onClick={onDownvote}
    count={count}
  >
    <DownvoteIcon className={active ? 'ResponseButton-icon--downvoted' : ''} />
  </Button>
);

Downvote.propTypes = {
  t: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

export default enhance(Downvote);
