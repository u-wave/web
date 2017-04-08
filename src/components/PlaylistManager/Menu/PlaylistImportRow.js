import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import ImportIcon from 'material-ui/svg-icons/action/input';

import Loader from '../../Loader';

const PlaylistImportRow = ({
  t,
  className,
  importing,
  onClick
}) => {
  let icon;
  if (importing) {
    icon = (
      <div className="PlaylistMenuRow-loading">
        <Loader size="tiny" />
      </div>
    );
  } else {
    icon = (
      <div className="PlaylistMenuRow-active-icon">
        <ImportIcon color="#fff" />
      </div>
    );
  }
  return (
    <button
      role="menuitem"
      className={cx('PlaylistMenuRow', 'PlaylistMenuRow--import', className)}
      onClick={onClick}
    >
      <div className="PlaylistMenuRow-content">
        <div className="PlaylistMenuRow-title">
          {icon}
          {t('playlists.import.title')}
        </div>
      </div>
    </button>
  );
};

PlaylistImportRow.propTypes = {
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
  importing: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default translate()(PlaylistImportRow);
