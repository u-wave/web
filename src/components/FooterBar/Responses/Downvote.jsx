import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import DownvoteIcon from '@mui/icons-material/ThumbDown';
import Button from './Button';

function Downvote({
  disabled,
  active,
  count,
  onDownvote,
}) {
  const { t } = useTranslator();

  return (
    <Button
      disabled={disabled}
      tooltip={t('votes.downvote')}
      onClick={onDownvote}
      count={count}
    >
      <DownvoteIcon className={active ? 'ResponseButton-icon--downvoted' : ''} />
    </Button>
  );
}

Downvote.propTypes = {
  onDownvote: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

export default Downvote;
