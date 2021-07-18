import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HistoryIcon from '@material-ui/icons/History';

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
