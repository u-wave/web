import cx from 'classnames';
import React from 'react';
import ActiveIcon from 'material-ui/lib/svg-icons/toggle/check-box';
import ActivateIcon from 'material-ui/lib/svg-icons/toggle/check-box-outline-blank';

const PlaylistMeta = ({ className, active, id, name, onActivatePlaylist }) => {
  return (
    <div className={cx('PlaylistMeta', className, active ? 'PlaylistMeta--active' : '')}>
      <div className="PlaylistMeta-name">
        {name}
      </div>
      <div
        className="PlaylistMeta-active"
        onClick={() => !active && onActivatePlaylist(id)}
      >
        <div className="PlaylistMeta-active-icon">
          {active ? <ActiveIcon color="#fff" /> : <ActivateIcon color="#fff" />}
        </div>
        {active ? 'Active' : 'Activate'}
      </div>
    </div>
  );
};

export default PlaylistMeta;
