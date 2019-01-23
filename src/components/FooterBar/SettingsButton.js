import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@u-wave/react-translate';
import compose from 'recompose/compose';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/SettingsRounded';

const enhance = compose(
  translate(),
  React.memo,
);

const SettingsButton = ({ t, onClick }) => (
  <span>
    <Tooltip title={t('settings.title')}>
      <IconButton className="SettingsButton" onClick={onClick}>
        <SettingsIcon />
      </IconButton>
    </Tooltip>
  </span>
);

SettingsButton.propTypes = {
  t: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default enhance(SettingsButton);
