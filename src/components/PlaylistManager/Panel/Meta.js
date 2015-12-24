import cx from 'classnames';
import React from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import ActiveIcon from 'material-ui/lib/svg-icons/toggle/check-box';
import ActivateIcon from 'material-ui/lib/svg-icons/toggle/check-box-outline-blank';

const PlaylistMeta = ({ className, active, id, name, onActivatePlaylist }) => {
  return (
    <div className={cx('PlaylistMeta', className, active ? 'PlaylistMeta--active' : '')}>
      <div className="PlaylistMeta-name">
        {name}
      </div>
      <div className="PlaylistMeta-active">
        <Checkbox
          checked={active}
          onCheck={() => !active && onActivatePlaylist(id)}
          checkedIcon={<ActiveIcon color="#fff" />}
          unCheckedIcon={<ActivateIcon color="#fff" />}
          label={active ? 'Active' : 'Activate'}
        />
      </div>
    </div>
  );
};

export default PlaylistMeta;
