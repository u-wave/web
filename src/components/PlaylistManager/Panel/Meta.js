import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import ShuffleIcon from 'material-ui/svg-icons/av/shuffle';
import ActiveIcon from 'material-ui/svg-icons/toggle/check-box';
import ActivateIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank';

import RenamePlaylistButton from './RenamePlaylistButton';
import DeletePlaylistButton from './DeletePlaylistButton';
import PlaylistFilter from './PlaylistFilter';

const checkboxIconStyle = { fill: '#fff' };

const PlaylistMeta = ({
  t,
  className,
  active,
  name,
  onShufflePlaylist,
  onActivatePlaylist,
  onRenamePlaylist,
  onDeletePlaylist,
  onNotDeletable,
  onFilter
}) => (
  <div className={cx('PlaylistMeta', className, active ? 'PlaylistMeta--active' : '')}>
    <div className="PlaylistMeta-name">
      {name}
    </div>
    <div className="PlaylistMeta-active">
      <Checkbox
        checked={active}
        onCheck={active ? null : onActivatePlaylist}
        checkedIcon={<ActiveIcon color="#fff" />}
        uncheckedIcon={<ActivateIcon color="#fff" />}
        iconStyle={checkboxIconStyle}
        label={active ? t('playlists.active') : t('playlists.activate')}
      />
    </div>
    <PlaylistFilter
      onFilter={onFilter}
    />
    <IconButton
      onClick={onShufflePlaylist}
      tooltip={t('playlists.shuffle')}
      tooltipPosition="top-center"
    >
      <ShuffleIcon color="#555" hoverColor="#fff" />
    </IconButton>
    <RenamePlaylistButton
      initialName={name}
      onRename={onRenamePlaylist}
    />
    <DeletePlaylistButton
      active={active}
      onNotDeletable={onNotDeletable}
      onDelete={onDeletePlaylist}
    />
  </div>
);

PlaylistMeta.propTypes = {
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
  active: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onShufflePlaylist: PropTypes.func.isRequired,
  onActivatePlaylist: PropTypes.func.isRequired,
  onRenamePlaylist: PropTypes.func.isRequired,
  onDeletePlaylist: PropTypes.func.isRequired,
  onNotDeletable: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired
};

export default translate()(PlaylistMeta);
