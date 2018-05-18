import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import ImportIcon from '@material-ui/icons/Input';

const enhance = translate();

const PlaylistImportRow = ({
  t,
  className,
  importing,
  onClick,
}) => {
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
};

PlaylistImportRow.propTypes = {
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
  importing: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default enhance(PlaylistImportRow);
