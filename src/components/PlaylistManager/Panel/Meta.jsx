/* eslint-disable jsx-a11y/label-has-for */
import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Checkbox from '@mui/material/Checkbox';
import { mdiCheckboxMarked, mdiCheckboxBlankOutline } from '@mdi/js';
import SvgIcon from '../../SvgIcon';
import RenamePlaylistButton from './RenamePlaylistButton';
import DeletePlaylistButton from './DeletePlaylistButton';
import ShufflePlaylistButton from './ShufflePlaylistButton';
import PlaylistFilter from './PlaylistFilter';

const ID = 'playlist-meta-active';

function PlaylistMeta({
  className,
  active,
  name,
  onShufflePlaylist,
  onActivatePlaylist,
  onRenamePlaylist,
  onDeletePlaylist,
  onNotDeletable,
  onFilter,
}) {
  const { t } = useTranslator();

  return (
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
          icon={<SvgIcon path={mdiCheckboxBlankOutline} />}
          checkedIcon={<SvgIcon path={mdiCheckboxMarked} />}
          style={active ? { color: 'white' } : null}
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
}

PlaylistMeta.propTypes = {
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

export default PlaylistMeta;
