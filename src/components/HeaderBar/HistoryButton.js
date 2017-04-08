import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import IconButton from 'material-ui/IconButton';
import HistoryIcon from 'material-ui/svg-icons/action/history';

const fullSize = { width: '100%', height: '100%' };

const HistoryButton = ({ t, onClick }) => (
  <IconButton
    className="HeaderHistoryButton"
    style={fullSize}
    tooltip={t('history.title')}
    tooltipPosition="bottom-center"
    onClick={onClick}
  >
    <HistoryIcon
      style={fullSize}
      color="#fff"
      className="HeaderHistoryButton-icon"
    />
  </IconButton>
);

HistoryButton.propTypes = {
  t: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default compose(
  translate(),
  pure
)(HistoryButton);
