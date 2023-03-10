import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import SvgIcon from '../../SvgIcon';

const mdiImport = 'M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z';

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
        <SvgIcon path={mdiImport} />
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
