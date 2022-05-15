import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import SadvoteIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Button from './Button';

function Sadvote({
  disabled,
  active,
  count,
  onSadvote,
}) {
  const { t } = useTranslator();

  return (
    <Button
      disabled={disabled}
      tooltip={t('votes.sadvote')}
      onClick={onSadvote}
      count={count}
    >
      <SadvoteIcon className={active ? 'ResponseButton-icon--sadvoted' : ''} />
    </Button>
  );
}

Sadvote.propTypes = {
  onSadvote: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

export default Sadvote;
