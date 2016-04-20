import cx from 'classnames';
import * as React from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import IconButton from 'material-ui/lib/icon-button';
import ActiveIcon from 'material-ui/lib/svg-icons/toggle/check-box';
import ActivateIcon from 'material-ui/lib/svg-icons/toggle/check-box-outline-blank';
import EditIcon from 'material-ui/lib/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';

const PlaylistMeta = ({
  className, active, id, name,
  onActivatePlaylist, onRenamePlaylist, onDeletePlaylist
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
        unCheckedIcon={<ActivateIcon color="#fff" />}
        label={active ? 'Active' : 'Activate'}
      />
    </div>
    <IconButton
      onClick={() => onRenamePlaylist(id)}
      tooltip="Rename"
      tooltipPosition="top-center"
    >
      <EditIcon color="#555" hoverColor="#fff" />
    </IconButton>
    <IconButton
      onClick={() => onDeletePlaylist(id)}
      tooltip="Delete"
      tooltipPosition="top-center"
    >
      <DeleteIcon color="#555" hoverColor={active ? '#555' : '#fff'} />
    </IconButton>
  </div>
);

PlaylistMeta.propTypes = {
  className: React.PropTypes.string,
  active: React.PropTypes.bool.isRequired,
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  onActivatePlaylist: React.PropTypes.func.isRequired,
  onRenamePlaylist: React.PropTypes.func.isRequired,
  onDeletePlaylist: React.PropTypes.func.isRequired
};

export default PlaylistMeta;
