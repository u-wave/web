import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import HistoryIcon from 'material-ui-icons/History';

const HistoryButton = ({ t, onClick }) => (
  <Tooltip title={t('history.title')} position="bottom">
    <IconButton
      aria-label={t('history.title')}
      className="HeaderHistoryButton"
      onClick={onClick}
    >
      <HistoryIcon className="HeaderHistoryButton-icon" />
    </IconButton>
  </Tooltip>
);

HistoryButton.propTypes = {
  t: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default compose(
  translate(),
  pure,
)(HistoryButton);
