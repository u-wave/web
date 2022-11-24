import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import { mdiThumbUp } from '@mdi/js';
import SvgIcon from '../../SvgIcon';
import Button from './Button';

function Upvote({
  disabled,
  active,
  count,
  onUpvote,
}) {
  const { t } = useTranslator();

  return (
    <Button
      disabled={disabled}
      tooltip={t('votes.upvote')}
      onClick={onUpvote}
      count={count}
    >
      <SvgIcon
        path={mdiThumbUp}
        className={active ? 'ResponseButton-icon--upvoted' : ''}
      />
    </Button>
  );
}

Upvote.propTypes = {
  onUpvote: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

export default Upvote;
