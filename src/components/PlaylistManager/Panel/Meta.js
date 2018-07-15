/* eslint-disable jsx-a11y/label-has-for */
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Checkbox from '@material-ui/core/Checkbox';
import ActiveIcon from '@material-ui/icons/CheckBox';
import ActivateIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import RenamePlaylistButton from './RenamePlaylistButton';
import DeletePlaylistButton from './DeletePlaylistButton';
import ShufflePlaylistButton from './ShufflePlaylistButton';
import PlaylistFilter from './PlaylistFilter';

const enhance = translate();

const ID = 'playlist-meta-active';

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
  onFilter,
}) => (
  <div className={cx('PlaylistMeta', className, active && 'PlaylistMeta--active')}>
    <div className="PlaylistMeta-name">
      {name}
    </div>
    <label htmlFor={ID} className={cx('PlaylistMeta-active', active && 'is-active')}>
      <Checkbox
        id={ID}
        checked={active}
        disabled={active}
        onChange={active ? null : onActivatePlaylist}
        icon={<ActivateIcon />}
        checkedIcon={<ActiveIcon nativeColor="#fff" />}
      />
      <span>
        {active ? t('playlists.active') : t('playlists.activate')}
      </span>
    </label>
    <PlaylistFilter
      onFilter={onFilter}
    />
    <ShufflePlaylistButton onShuffle={onShufflePlaylist} />
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
  onFilter: PropTypes.func.isRequired,
};

export default enhance(PlaylistMeta);
