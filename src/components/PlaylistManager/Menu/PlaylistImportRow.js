import cx from 'classnames';
import * as React from 'react';
import ImportIcon from 'material-ui/svg-icons/action/input';

import Loader from '../../Loader';

const PlaylistImportRow = ({
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
    <button role="menuitem" onClick={onClick}>
      <div className={cx('PlaylistMenuRow', 'PlaylistMenuRow--import', className)}>
        <div className="PlaylistMenuRow-title">
          {icon}
          Import
        </div>
      </div>
    </button>
  );
};

PlaylistImportRow.propTypes = {
  className: React.PropTypes.string,
  importing: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
};

export default PlaylistImportRow;
