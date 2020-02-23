import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/SettingsRounded';

function SettingsButton({ onClick }) {
  const { t } = useTranslator();

  return (
    <span>
      <Tooltip title={t('settings.title')}>
        <IconButton className="SettingsButton" onClick={onClick}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>
    </span>
  );
}

SettingsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default React.memo(SettingsButton);
