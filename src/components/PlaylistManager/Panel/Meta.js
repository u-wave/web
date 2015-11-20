import cx from 'classnames';
import React from 'react';
import ActiveIcon from 'material-ui/lib/svg-icons/toggle/check-box';
import ActivateIcon from 'material-ui/lib/svg-icons/toggle/check-box-outline-blank';
import { activatePlaylist } from '../../../actions/PlaylistActionCreators';

const PlaylistMeta = ({ className, active, id, name }) => {
  const activate = () => activatePlaylist(id);
  return (
    <div className={cx('PlaylistMeta', className, active ? 'PlaylistMeta--active' : '')}>
      <div className="PlaylistMeta-name">
        {name}
      </div>
      <div
        className="PlaylistMeta-active"
        onClick={activate}
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
