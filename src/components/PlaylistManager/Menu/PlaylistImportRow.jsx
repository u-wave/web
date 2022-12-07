import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import ImportIcon from '@mui/icons-material/Input';

function PlaylistImportRow({
  className,
  importing,
  onClick,
}) {
  const { t } = useTranslator();

  let icon;
  if (importing) {
    icon = (
      <div className="PlaylistMenuRow-loading">
        <CircularProgress size="100%" />
      </div>
    );
  } else {
    icon = (
      <div className="PlaylistMenuRow-active-icon">
        <ImportIcon />
      </div>
    );
  }

  return (
    <MenuItem
      className={cx('PlaylistMenuRow', 'PlaylistMenuRow--import', className)}
      onClick={onClick}
    >
      <div className="PlaylistMenuRow-title">
        {icon}
        {t('playlists.import.title')}
      </div>
    </MenuItem>
  );
}

PlaylistImportRow.propTypes = {
  className: PropTypes.string,
  importing: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default PlaylistImportRow;
