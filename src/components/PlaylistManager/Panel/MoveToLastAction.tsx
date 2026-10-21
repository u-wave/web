import { mdiChevronDown } from '@mdi/js';
import { useCallback } from 'react';
import { useDispatch } from '../../../hooks/useRedux';
import { movePlaylistItems, type PlaylistItem } from '../../../reducers/playlists';
import MediaAction from '../../MediaList/MediaAction';
import SvgIcon from '../../SvgIcon';
import { usePlaylistContext } from './context';

type MoveToLastActionProps = {
  media: PlaylistItem,
};
function MoveToLastAction({ media }: MoveToLastActionProps) {
  const { playlist, selection } = usePlaylistContext();
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    const selectedItems = selection.isSelected(media) ? selection.get() : [media];

    dispatch(movePlaylistItems({
      playlistID: playlist._id,
      medias: selectedItems as PlaylistItem[],
      target: { at: 'end' },
    }));
  }, [dispatch, playlist, media, selection]);

  return (
    <MediaAction onClick={handleClick}>
      <SvgIcon path={mdiChevronDown} />
    </MediaAction>
  );
}

export default MoveToLastAction;
