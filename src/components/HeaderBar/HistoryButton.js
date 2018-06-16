import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HistoryIcon from '@material-ui/icons/History';

const enhance = compose(
  translate(),
  pure,
);

const HistoryButton = ({ t, onClick }) => (
  <Tooltip title={t('history.title')} position="bottom">
    <IconButton
      aria-label={t('history.title')}
      className="HistoryButton"
      onClick={onClick}
    >
      <HistoryIcon className="HistoryButton-icon" />
    </IconButton>
  </Tooltip>
);

HistoryButton.propTypes = {
  t: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default enhance(HistoryButton);
