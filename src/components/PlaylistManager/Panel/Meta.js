import cx from 'classnames';
import * as React from 'react';
import Checkbox from 'material-ui/Checkbox';
import ActiveIcon from 'material-ui/svg-icons/toggle/check-box';
import ActivateIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import muiThemeable from 'material-ui/styles/muiThemeable';

import RenamePlaylistButton from './RenamePlaylistButton';
import DeletePlaylistButton from './DeletePlaylistButton';

const checkboxIconStyle = { fill: '#fff' };

const PlaylistMeta = ({
  muiTheme,
  className,
  active,
  id,
  name,
  onActivatePlaylist,
  onRenamePlaylist,
  onDeletePlaylist,
  onNotDeletable
}) => (
  <div className={cx('PlaylistMeta', className, active ? 'PlaylistMeta--active' : '')}>
    <div className="PlaylistMeta-name">
      {name}
    </div>
    <div className="PlaylistMeta-active">
      <Checkbox
        checked={active}
        onCheck={() => !active && onActivatePlaylist(id)}
        checkedIcon={<ActiveIcon color={muiTheme.palette.textColor} />}
        uncheckedIcon={<ActivateIcon color={muiTheme.palette.textColor} />}
        iconStyle={checkboxIconStyle}
        label={active ? 'Active' : 'Activate'}
      />
    </div>
    <RenamePlaylistButton
      initialName={name}
      onRename={newName => onRenamePlaylist(id, newName)}
    />
    <DeletePlaylistButton
      active={active}
      onNotDeletable={onNotDeletable}
      onDelete={() => onDeletePlaylist(id)}
    />
  </div>
);

PlaylistMeta.propTypes = {
  muiTheme: React.PropTypes.object.isRequired,
  className: React.PropTypes.string,
  active: React.PropTypes.bool.isRequired,
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  onActivatePlaylist: React.PropTypes.func.isRequired,
  onRenamePlaylist: React.PropTypes.func.isRequired,
  onDeletePlaylist: React.PropTypes.func.isRequired,
  onNotDeletable: React.PropTypes.func.isRequired
};

export default muiThemeable()(PlaylistMeta);
