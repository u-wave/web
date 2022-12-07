import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import HistoryIcon from '@mui/icons-material/History';

function HistoryButton({ onClick }) {
  const { t } = useTranslator();

  return (
    <Tooltip title={t('history.title')} placement="bottom">
      <IconButton
        aria-label={t('history.title')}
        className="HistoryButton"
        onClick={onClick}
      >
        <HistoryIcon className="HistoryButton-icon" />
      </IconButton>
    </Tooltip>
  );
}

HistoryButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default React.memo(HistoryButton);
