import cx from 'classnames';
import * as React from 'react';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import ShuffleIcon from 'material-ui/svg-icons/av/shuffle';
import ActiveIcon from 'material-ui/svg-icons/toggle/check-box';
import ActivateIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank';

import RenamePlaylistButton from './RenamePlaylistButton';
import DeletePlaylistButton from './DeletePlaylistButton';

const checkboxIconStyle = { fill: '#fff' };

const PlaylistMeta = ({
  className,
  active,
  id,
  name,
  onShufflePlaylist,
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
        checkedIcon={<ActiveIcon color="#fff" />}
        uncheckedIcon={<ActivateIcon color="#fff" />}
        iconStyle={checkboxIconStyle}
        label={active ? 'Active' : 'Activate'}
      />
    </div>
    <IconButton
      onClick={onShufflePlaylist}
      tooltip="Shuffle"
      tooltipPosition="top-center"
    >
      <ShuffleIcon color="#555" hoverColor="#fff" />
    </IconButton>
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
  className: React.PropTypes.string,
  active: React.PropTypes.bool.isRequired,
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  onShufflePlaylist: React.PropTypes.func.isRequired,
  onActivatePlaylist: React.PropTypes.func.isRequired,
  onRenamePlaylist: React.PropTypes.func.isRequired,
  onDeletePlaylist: React.PropTypes.func.isRequired,
  onNotDeletable: React.PropTypes.func.isRequired
};

export default PlaylistMeta;
