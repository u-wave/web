/* eslint-disable jsx-a11y/label-has-for */
import cx from 'clsx';
import { useId } from 'react';
import { useTranslator } from '@u-wave/react-translate';
import Checkbox from '@mui/material/Checkbox';
import { mdiCheckboxMarked, mdiCheckboxBlankOutline } from '@mdi/js';
import SvgIcon from '../../SvgIcon';
import RenamePlaylistButton from './RenamePlaylistButton';
import DeletePlaylistButton from './DeletePlaylistButton';
import ShufflePlaylistButton from './ShufflePlaylistButton';
import PlaylistFilter from './PlaylistFilter';

type PlaylistMetaProps = {
  className?: string,
  active: boolean,
  name: string,
  onShufflePlaylist: () => Promise<void>,
  onActivatePlaylist: () => Promise<void>,
  onRenamePlaylist: (newName: string) => Promise<void>,
  onDeletePlaylist: () => Promise<void>,
  onFilter: (filter: string | null) => void,
};
function PlaylistMeta({
  className,
  active,
  name,
  onShufflePlaylist,
  onActivatePlaylist,
  onRenamePlaylist,
  onDeletePlaylist,
  onFilter,
}: PlaylistMetaProps) {
  const { t } = useTranslator();
  const id = useId();

  return (
    <div className={cx('PlaylistMeta', className, active && 'PlaylistMeta--active')}>
      <div className="PlaylistMeta-name">
        {name}
      </div>
      <label htmlFor={id} className={cx('PlaylistMeta-active', active && 'is-active')}>
        <Checkbox
          id={id}
          checked={active}
          disabled={active}
          onChange={active ? undefined : onActivatePlaylist}
          icon={<SvgIcon path={mdiCheckboxBlankOutline} />}
          checkedIcon={<SvgIcon path={mdiCheckboxMarked} />}
          style={active ? { color: 'white' } : undefined}
        />
        <span>
          {active ? t('playlists.active') : t('playlists.activate')}
        </span>
      </label>
      <PlaylistFilter onFilter={onFilter} />
      <ShufflePlaylistButton onShuffle={onShufflePlaylist} />
      <RenamePlaylistButton
        initialName={name}
        onRename={onRenamePlaylist}
      />
      <DeletePlaylistButton
        active={active}
        onDelete={onDeletePlaylist}
      />
    </div>
  );
}

export default PlaylistMeta;
