import { useCallback } from 'react';
import { mdiChevronDown } from '@mdi/js';
import { useDispatch } from '../../../hooks/useRedux';
import { type PlaylistItem, movePlaylistItems } from '../../../reducers/playlists';
import SvgIcon from '../../SvgIcon';
import MediaAction from '../../MediaList/MediaAction';
import { usePlaylistContext } from '.';

type MoveToLastActionProps = {
  media: PlaylistItem,
}
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
